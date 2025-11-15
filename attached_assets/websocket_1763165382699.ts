import { WebSocketServer, WebSocket } from "ws";
import type { Server } from "http";
import { drawCommandSchema } from "@shared/schema";

interface ClientMetadata {
  ws: WebSocket;
  userId: string;
  role: "student" | "supervisor" | "admin";
  studentId?: string;
  roomToken?: string;
}

type InboundMessage = {
  type: "auth" | "chat_message" | "student_update" | "new_student_registration" |
        "assignment_update" | "session_enable" | "error_notification" |
        "room:join" | "room:leave" | "webrtc:offer" | "webrtc:answer" | "webrtc:ice-candidate" |
        "room:hand-raise" | "room:hand-lower" | "room:toggle-hand" | "room:reaction" | "room:mute-participant" |
        "room:mute-all" | "room:all-muted" | "room:remove-participant" | "room:lock" |
        "whiteboard:command";
  payload: any;
};

class WebSocketService {
  private wss: WebSocketServer | null = null;
  private clients: Map<string, ClientMetadata> = new Map();
  private sockets: Map<WebSocket, ClientMetadata> = new Map();
  private rooms: Map<string, Set<string>> = new Map();

  initialize(server: Server) {
    this.wss = new WebSocketServer({ server, path: "/ws" });

    this.wss.on("connection", (ws, req) => {
      console.log("🔌 New WebSocket connection");

      ws.on("message", (message: string) => {
        try {
          const data = JSON.parse(message.toString()) as InboundMessage;
          this.handleMessage(ws, data);
        } catch (error) {
          console.error("❌ Error parsing WebSocket message:", error);
        }
      });

      ws.on("close", () => this.handleDisconnect(ws));
      ws.on("error", (error) => console.error("❌ WebSocket error:", error));
    });

    console.log("✅ WebSocket server initialized on /ws");
  }

  private handleMessage(ws: WebSocket, data: InboundMessage) {
    const { type, payload } = data;

    switch (type) {
      case "auth":
        this.handleAuth(ws, payload);
        break;
      case "room:join":
        this.handleRoomJoin(ws, payload);
        break;
      case "room:leave":
        this.handleRoomLeave(ws, payload?.roomToken);
        break;
      case "webrtc:offer":
      case "webrtc:answer":
      case "webrtc:ice-candidate":
        this.handleWebRTCSignal(ws, type, payload);
        break;
      case "room:hand-raise":
      case "room:hand-lower":
        this.handleHandRaise(ws, type, payload);
        break;
      case "room:toggle-hand":
        this.handleHandToggle(ws, payload);
        break;
      case "room:reaction":
        this.handleReaction(ws, payload);
        break;
      case "whiteboard:command":
        this.handleWhiteboardCommand(ws, payload);
        break;
      case "room:mute-participant":
        this.handleParticipantMute(ws, payload);
        break;
      case "room:all-muted":
        this.handleMuteAll(ws, payload);
        break;
      case "room:remove-participant":
        this.handleParticipantRemove(ws, payload);
        break;
      case "room:lock":
        this.handleRoomLock(ws, payload);
        break;
      case "chat_message":
        void this.handleChatMessage(ws, payload);
        break;
      case "student_update":
        this.broadcastToSupervisors(payload);
        break;
      case "new_student_registration":
        this.notifySheikhOfNewStudent(payload);
        break;
      case "assignment_update":
        this.sendToStudent(payload.studentId, { type: "assignment_updated", data: payload });
        break;
      case "session_enable":
        this.handleSessionEnable(payload);
        break;
      case "error_notification":
        this.broadcastToSupervisors({ type: "student_error", data: payload });
        break;
      default:
        console.log("⚠️ Unknown message type:", type);
    }
  }

  private handleAuth(ws: WebSocket, payload: any) {
    const { userId, role, studentId } = payload;
    const metadata: ClientMetadata = { ws, userId, role, studentId };

    this.clients.set(userId, metadata);
    this.sockets.set(ws, metadata);

    console.log(`✅ User ${userId} authenticated as ${role}`);

    ws.send(JSON.stringify({ type: "auth_success", payload: { userId, role } }));
  }

  private handleRoomJoin(ws: WebSocket, payload: any) {
    const client = this.sockets.get(ws);
    if (!client) {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Unauthorized" } }));
      return;
    }

    const { roomToken } = payload ?? {};
    if (!roomToken) {
      ws.send(JSON.stringify({ type: "error", payload: { message: "roomToken required" } }));
      return;
    }

    client.roomToken = roomToken;

    if (!this.rooms.has(roomToken)) {
      this.rooms.set(roomToken, new Set());
    }
    this.rooms.get(roomToken)!.add(client.userId);

    this.broadcastParticipants(roomToken);

    ws.send(JSON.stringify({
      type: "room:joined",
      payload: { roomToken, participants: this.getParticipants(roomToken) }
    }));
  }

  private handleRoomLeave(ws: WebSocket, roomToken?: string) {
    const client = this.sockets.get(ws);
    if (!client) return;
    const token = roomToken ?? client.roomToken;
    if (!token) return;

    const members = this.rooms.get(token);
    if (!members) return;

    members.delete(client.userId);
    
    if (this.participantHandStates.has(token)) {
      this.participantHandStates.get(token)!.delete(client.userId);
      if (this.participantHandStates.get(token)!.size === 0) {
        this.participantHandStates.delete(token);
      }
    }

    if (members.size === 0) {
      this.rooms.delete(token);
      this.participantHandStates.delete(token);
    }

    client.roomToken = undefined;
    this.broadcastParticipants(token);
  }

  private handleWebRTCSignal(ws: WebSocket, type: "webrtc:offer" | "webrtc:answer" | "webrtc:ice-candidate", payload: any) {
    const client = this.sockets.get(ws);
    if (!client?.roomToken) {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Join a room first" } }));
      return;
    }

    const members = this.rooms.get(client.roomToken);
    if (!members) return;

    members.forEach((userId) => {
      if (userId === client.userId) return;
      const peer = this.clients.get(userId);
      if (!peer) return;

      peer.ws.send(JSON.stringify({
        type,
        payload: {
          from: client.userId,
          role: client.role,
          data: payload,
        },
      }));
    });
  }

  private broadcastParticipants(roomToken: string) {
    const members = this.rooms.get(roomToken);
    if (!members) return;

    const participants = this.getParticipants(roomToken);

    members.forEach((userId) => {
      const client = this.clients.get(userId);
      if (!client) return;
      client.ws.send(JSON.stringify({
        type: "room:participants",
        payload: { roomToken, participants },
      }));
    });
  }

  private getParticipants(roomToken: string) {
    const members = this.rooms.get(roomToken);
    if (!members) return [];
    return Array.from(members).map((userId) => {
      const client = this.clients.get(userId);
      return client
        ? { userId: client.userId, role: client.role, studentId: client.studentId }
        : { userId };
    });
  }

  private handleDisconnect(ws: WebSocket) {
    const client = this.sockets.get(ws);
    if (!client) return;

    this.clients.delete(client.userId);
    this.sockets.delete(ws);

    if (client.roomToken) {
      this.handleRoomLeave(ws, client.roomToken);
    }

    console.log(`👋 User ${client.userId} disconnected`);
  }

  private broadcastToSupervisors(payload: any) {
    this.clients.forEach((client) => {
      if (client.role === "supervisor" || client.role === "admin") {
        client.ws.send(JSON.stringify({ type: "student_notification", payload }));
      }
    });
  }

  private sendToStudent(studentId: string, payload: any) {
    this.clients.forEach((client) => {
      if (client.studentId === studentId || client.userId === studentId) {
        client.ws.send(JSON.stringify(payload));
      }
    });
  }

  private async handleChatMessage(ws: WebSocket, payload: any) {
    const { content, senderId, receiverId, isGroupMessage, messageType = "text" } = payload;
    const client = this.sockets.get(ws);
    
    if (!client) {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Unauthorized" } }));
      return;
    }

    const { storage } = await import("./storage");
    try {
      const savedMessage = await storage.createMessage({ senderId, receiverId: receiverId || null, content, messageType, isGroupMessage: isGroupMessage || false });
      
      if (isGroupMessage && client.roomToken) {
        this.broadcastToRoom(client.roomToken, { type: "chat_message", payload: savedMessage });
      } else if (receiverId) {
        this.sendChatMessageToUser(receiverId, savedMessage);
      } else {
        ws.send(JSON.stringify({ type: "chat_message", payload: savedMessage }));
      }
    } catch (error) {
      console.error("❌ Error handling chat message:", error);
      ws.send(JSON.stringify({ type: "error", payload: { message: "Failed to send message" } }));
    }
  }

  private broadcastToRoom(roomToken: string, message: any) {
    const members = this.rooms.get(roomToken);
    if (!members) return;

    members.forEach((userId) => {
      const client = this.clients.get(userId);
      if (client) {
        client.ws.send(JSON.stringify(message));
      }
    });
  }

  private sendChatMessageToUser(userId: string, message: any) {
    const client = this.clients.get(userId);
    if (client) {
      client.ws.send(JSON.stringify({ type: "chat_message", payload: message }));
    }
  }

  private handleSessionEnable(payload: any) {
    const { studentId, sessionData } = payload;
    this.sendToStudent(studentId, { type: "session_enabled", data: sessionData });
  }

  public notifySheikhOfNewStudent(studentData: any) {
    this.broadcastToSupervisors({ type: "new_student", student: studentData, timestamp: new Date().toISOString() });
  }

  public notifyStudentOfAssignment(studentId: string, assignment: any) {
    this.sendToStudent(studentId, { type: "new_assignment", data: assignment });
  }

  public enableSessionAccess(studentId: string, sessionData: any) {
    this.sendToStudent(studentId, { type: "session_enabled", data: sessionData });
  }

  public notifyStudentOfCertificate(studentId: string, certificate: any) {
    this.sendToStudent(studentId, { type: "certificate_issued", data: certificate });
  }

  public notifyStudentOfPayment(studentId: string, payment: any) {
    this.sendToStudent(studentId, { type: "payment_received", data: payment });
  }

  public notifyStudentOfMeeting(studentId: string, meeting: any) {
    this.sendToStudent(studentId, { type: "meeting_scheduled", data: meeting });
  }

  public notifyStudentOfQuranUpdate(studentId: string, updateData: any) {
    this.sendToStudent(studentId, { type: "quran_update", data: updateData, timestamp: new Date().toISOString() });
  }

  public notifyStudentOfNewError(studentId: string, error: any) {
    this.sendToStudent(studentId, { type: "new_error_added", data: error, timestamp: new Date().toISOString() });
  }

  public notifyStudentOfNoteUpdate(studentId: string, note: any) {
    this.sendToStudent(studentId, { type: "note_updated", data: note, timestamp: new Date().toISOString() });
  }

  private handleHandRaise(ws: WebSocket, type: "room:hand-raise" | "room:hand-lower", payload: any) {
    const client = this.sockets.get(ws);
    if (!client?.roomToken) {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Join a room first" } }));
      return;
    }

    const isRaised = type === "room:hand-raise";

    this.broadcastToRoom(client.roomToken, {
      type: isRaised ? "room:hand-raised" : "room:hand-lowered",
      payload: { userId: client.userId, isHandRaised: isRaised }
    });
  }

  private handleHandToggle(ws: WebSocket, payload: any) {
    const client = this.sockets.get(ws);
    if (!client?.roomToken) {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Join a room first" } }));
      return;
    }

    const userId = client.userId;
    const currentState = this.getParticipantHandState(client.roomToken, userId);
    const newState = !currentState;

    this.setParticipantHandState(client.roomToken, userId, newState);

    this.broadcastToRoom(client.roomToken, {
      type: newState ? "room:hand-raised" : "room:hand-lowered",
      payload: { userId, isHandRaised: newState }
    });
  }

  private participantHandStates: Map<string, Map<string, boolean>> = new Map();

  private getParticipantHandState(roomToken: string, userId: string): boolean {
    if (!this.participantHandStates.has(roomToken)) {
      this.participantHandStates.set(roomToken, new Map());
    }
    return this.participantHandStates.get(roomToken)!.get(userId) || false;
  }

  private setParticipantHandState(roomToken: string, userId: string, state: boolean): void {
    if (!this.participantHandStates.has(roomToken)) {
      this.participantHandStates.set(roomToken, new Map());
    }
    this.participantHandStates.get(roomToken)!.set(userId, state);
  }

  private handleWhiteboardCommand(ws: WebSocket, payload: any) {
    const client = this.sockets.get(ws);
    if (!client?.roomToken) {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Join a room first" } }));
      return;
    }

    const { command } = payload;

    const validationResult = drawCommandSchema.safeParse(command);
    if (!validationResult.success) {
      console.warn('Invalid whiteboard command:', validationResult.error);
      ws.send(JSON.stringify({ 
        type: "error", 
        payload: { message: "Invalid whiteboard command format" } 
      }));
      return;
    }

    const members = this.rooms.get(client.roomToken);
    if (!members || !members.has(client.userId)) {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Not a member of this room" } }));
      return;
    }

    const sanitizePoints = (points: any): Array<{x: number, y: number}> | undefined => {
      if (!Array.isArray(points) || points.length === 0) return undefined;
      try {
        return points
          .filter(p => p && typeof p === 'object')
          .map(p => ({
            x: Number(p.x) || 0,
            y: Number(p.y) || 0
          }))
          .slice(0, 10000);
      } catch {
        return undefined;
      }
    };

    const sanitizedCommand: any = {
      type: String(command.type).slice(0, 50),
      userId: client.userId
    };

    if (command.x !== undefined && !isNaN(Number(command.x))) {
      sanitizedCommand.x = Number(command.x);
    }
    if (command.y !== undefined && !isNaN(Number(command.y))) {
      sanitizedCommand.y = Number(command.y);
    }
    if (command.width !== undefined && !isNaN(Number(command.width))) {
      sanitizedCommand.width = Math.max(0, Math.min(10000, Number(command.width)));
    }
    if (command.height !== undefined && !isNaN(Number(command.height))) {
      sanitizedCommand.height = Math.max(0, Math.min(10000, Number(command.height)));
    }
    if (command.color && typeof command.color === 'string') {
      sanitizedCommand.color = String(command.color).slice(0, 20);
    }
    if (command.text && typeof command.text === 'string') {
      sanitizedCommand.text = String(command.text).slice(0, 1000);
    }
    if (command.strokeWidth !== undefined && !isNaN(Number(command.strokeWidth))) {
      sanitizedCommand.strokeWidth = Math.max(1, Math.min(100, Number(command.strokeWidth)));
    }
    if (command.lineWidth !== undefined && !isNaN(Number(command.lineWidth))) {
      sanitizedCommand.lineWidth = Math.max(1, Math.min(100, Number(command.lineWidth)));
    }
    if (command.shape && typeof command.shape === 'string') {
      sanitizedCommand.shape = String(command.shape).slice(0, 20);
    }
    if (command.filled !== undefined) {
      sanitizedCommand.filled = Boolean(command.filled);
    }
    if (command.x2 !== undefined && !isNaN(Number(command.x2))) {
      sanitizedCommand.x2 = Number(command.x2);
    }
    if (command.y2 !== undefined && !isNaN(Number(command.y2))) {
      sanitizedCommand.y2 = Number(command.y2);
    }
    
    const sanitizedPoints = sanitizePoints(command.points);
    if (sanitizedPoints) {
      sanitizedCommand.points = sanitizedPoints;
    }

    const commandId = `${client.roomToken}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();

    this.broadcastToRoom(client.roomToken, {
      type: "whiteboard:command",
      payload: {
        id: commandId,
        command: sanitizedCommand,
        userId: client.userId,
        timestamp
      }
    });
  }

  private handleReaction(ws: WebSocket, payload: any) {
    const client = this.sockets.get(ws);
    if (!client?.roomToken) {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Join a room first" } }));
      return;
    }

    const { reaction } = payload;

    this.broadcastToRoom(client.roomToken, {
      type: "room:reaction",
      payload: { userId: client.userId, reaction }
    });
  }

  private handleParticipantMute(ws: WebSocket, payload: any) {
    const client = this.sockets.get(ws);
    if (!client?.roomToken) {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Join a room first" } }));
      return;
    }

    if (client.role !== "supervisor" && client.role !== "admin") {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Only supervisors can mute participants" } }));
      return;
    }

    const { participantId, shouldMute } = payload;

    this.broadcastToRoom(client.roomToken, {
      type: "room:participant-muted",
      payload: { participantId, shouldMute }
    });
  }

  private handleMuteAll(ws: WebSocket, payload: any) {
    const client = this.sockets.get(ws);
    if (!client?.roomToken) {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Join a room first" } }));
      return;
    }

    if (client.role !== "supervisor" && client.role !== "admin") {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Only supervisors can mute all" } }));
      return;
    }

    this.broadcastToRoom(client.roomToken, {
      type: "room:all-muted",
      payload: { initiatorId: client.userId }
    });
  }

  private handleParticipantRemove(ws: WebSocket, payload: any) {
    const client = this.sockets.get(ws);
    if (!client?.roomToken) {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Join a room first" } }));
      return;
    }

    if (client.role !== "supervisor" && client.role !== "admin") {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Only supervisors can remove participants" } }));
      return;
    }

    const { participantId } = payload;
    const targetClient = this.clients.get(participantId);
    
    if (targetClient) {
      targetClient.ws.send(JSON.stringify({
        type: "room:kicked",
        payload: { reason: "Removed by supervisor" }
      }));

      this.handleRoomLeave(targetClient.ws, client.roomToken);
    }

    this.broadcastToRoom(client.roomToken, {
      type: "room:participant-removed",
      payload: { participantId }
    });
  }

  private handleRoomLock(ws: WebSocket, payload: any) {
    const client = this.sockets.get(ws);
    if (!client?.roomToken) {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Join a room first" } }));
      return;
    }

    if (client.role !== "supervisor" && client.role !== "admin") {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Only supervisors can lock/unlock rooms" } }));
      return;
    }

    const { locked } = payload;

    this.broadcastToRoom(client.roomToken, {
      type: "room:lock-changed",
      payload: { locked }
    });
  }
}

export const wsService = new WebSocketService();
