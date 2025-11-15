import { useWhiteboard, type DrawCommand } from '@/hooks/useWhiteboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Pencil, 
  Eraser, 
  Trash2, 
  Palette,
  Minus,
  Plus,
  Square,
  Circle,
  ArrowRight,
  Type,
  PaintBucket,
  Undo2,
  Redo2,
  Save,
  Upload
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEffect, useImperativeHandle, forwardRef, useRef } from 'react';

interface LiveWhiteboardProps {
  roomToken: string;
  userId: string;
  isEnabled: boolean;
  onSendCommand: (command: DrawCommand) => void;
  onExecuteCommand: (executeFunc: (command: DrawCommand) => void) => void;
}

export const LiveWhiteboard = forwardRef<any, LiveWhiteboardProps>(({ 
  roomToken, 
  userId, 
  isEnabled, 
  onSendCommand,
  onExecuteCommand 
}, ref) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    canvasRef,
    tool,
    setTool,
    color,
    setColor,
    lineWidth,
    setLineWidth,
    filled,
    setFilled,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    executeRemoteCommand,
    undo,
    redo,
    canUndo,
    canRedo,
    saveAsImage,
    saveAsJSON,
    loadFromJSON
  } = useWhiteboard({ 
    roomToken, 
    userId, 
    isEnabled, 
    onSendCommand 
  });

  const handleLoadJSON = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        loadFromJSON(content);
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    onExecuteCommand(executeRemoteCommand);
  }, [executeRemoteCommand, onExecuteCommand]);

  useImperativeHandle(ref, () => ({
    executeRemoteCommand
  }));

  const colors = [
    { value: '#000000', name: 'أسود' },
    { value: '#FF0000', name: 'أحمر' },
    { value: '#0000FF', name: 'أزرق' },
    { value: '#00FF00', name: 'أخضر' },
    { value: '#FFFF00', name: 'أصفر' },
    { value: '#FF00FF', name: 'بنفسجي' },
    { value: '#FFA500', name: 'برتقالي' },
    { value: '#FFFFFF', name: 'أبيض' }
  ];

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    startDrawing(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    draw(x, y);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    stopDrawing(x, y);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isEnabled) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    startDrawing(x, y);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isEnabled) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    draw(x, y);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isEnabled) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (e.changedTouches && e.changedTouches.length > 0) {
      const touch = e.changedTouches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      stopDrawing(x, y);
    } else {
      stopDrawing();
    }
  };

  return (
    <Card className="bg-black/40 border-emerald-500/30 h-full flex flex-col">
      <CardContent className="p-4 flex-1 flex flex-col gap-3">
        {/* Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Drawing Tools */}
          <div className="flex gap-1">
            <Button
              size="icon"
              variant={tool === 'pen' ? 'default' : 'outline'}
              onClick={() => setTool('pen')}
              disabled={!isEnabled}
              className="bg-emerald-600 hover:bg-emerald-700"
              data-testid="button-whiteboard-pen"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant={tool === 'eraser' ? 'default' : 'outline'}
              onClick={() => setTool('eraser')}
              disabled={!isEnabled}
              className="bg-emerald-600 hover:bg-emerald-700"
              data-testid="button-whiteboard-eraser"
            >
              <Eraser className="w-4 h-4" />
            </Button>
          </div>

          {/* Shape Tools */}
          <div className="flex gap-1 border-r border-white/20 pr-2">
            <Button
              size="icon"
              variant={tool === 'rectangle' ? 'default' : 'outline'}
              onClick={() => setTool('rectangle')}
              disabled={!isEnabled}
              className="bg-emerald-600 hover:bg-emerald-700"
              data-testid="button-whiteboard-rectangle"
            >
              <Square className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant={tool === 'circle' ? 'default' : 'outline'}
              onClick={() => setTool('circle')}
              disabled={!isEnabled}
              className="bg-emerald-600 hover:bg-emerald-700"
              data-testid="button-whiteboard-circle"
            >
              <Circle className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant={tool === 'line' ? 'default' : 'outline'}
              onClick={() => setTool('line')}
              disabled={!isEnabled}
              className="bg-emerald-600 hover:bg-emerald-700"
              data-testid="button-whiteboard-line"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="5" y1="19" x2="19" y2="5" />
              </svg>
            </Button>
            <Button
              size="icon"
              variant={tool === 'arrow' ? 'default' : 'outline'}
              onClick={() => setTool('arrow')}
              disabled={!isEnabled}
              className="bg-emerald-600 hover:bg-emerald-700"
              data-testid="button-whiteboard-arrow"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant={tool === 'text' ? 'default' : 'outline'}
              onClick={() => setTool('text')}
              disabled={!isEnabled}
              className="bg-emerald-600 hover:bg-emerald-700"
              data-testid="button-whiteboard-text"
            >
              <Type className="w-4 h-4" />
            </Button>
          </div>

          {/* Fill Toggle */}
          {['rectangle', 'circle', 'line'].includes(tool) && (
            <Button
              size="icon"
              variant={filled ? 'default' : 'outline'}
              onClick={() => setFilled(!filled)}
              disabled={!isEnabled}
              className="bg-blue-600 hover:bg-blue-700"
              data-testid="button-whiteboard-fill"
            >
              <PaintBucket className="w-4 h-4" />
            </Button>
          )}

          {/* History Controls */}
          <div className="flex gap-1 border-r border-white/20 pr-2">
            <Button
              size="icon"
              variant="outline"
              onClick={undo}
              disabled={!isEnabled || !canUndo}
              className="bg-blue-600 hover:bg-blue-700"
              data-testid="button-whiteboard-undo"
              title="تراجع"
            >
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={redo}
              disabled={!isEnabled || !canRedo}
              className="bg-blue-600 hover:bg-blue-700"
              data-testid="button-whiteboard-redo"
              title="إعادة"
            >
              <Redo2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Save/Load Controls - Sheikh only */}
          {isEnabled && (
            <div className="flex gap-1 border-r border-white/20 pr-2">
              <Button
                size="icon"
                variant="outline"
                onClick={saveAsImage}
                className="bg-green-600 hover:bg-green-700"
                data-testid="button-whiteboard-save-image"
                title="حفظ كصورة"
              >
                <Save className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={saveAsJSON}
                className="bg-green-600 hover:bg-green-700"
                data-testid="button-whiteboard-save-json"
                title="حفظ كـ JSON"
              >
                <Save className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={handleLoadJSON}
                className="bg-purple-600 hover:bg-purple-700"
                data-testid="button-whiteboard-load"
                title="تحميل"
              >
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Clear Button */}
          <Button
            size="icon"
            variant="destructive"
            onClick={clearCanvas}
            disabled={!isEnabled}
            data-testid="button-whiteboard-clear"
          >
            <Trash2 className="w-4 h-4" />
          </Button>

          {/* Line Width */}
          <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setLineWidth(Math.max(1, lineWidth - 1))}
              disabled={!isEnabled}
              className="h-8 w-8"
              data-testid="button-whiteboard-decrease-width"
            >
              <Minus className="w-4 h-4 text-white" />
            </Button>
            <Badge className="bg-white/20 text-white min-w-[40px] justify-center">
              {lineWidth}
            </Badge>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setLineWidth(Math.min(20, lineWidth + 1))}
              disabled={!isEnabled}
              className="h-8 w-8"
              data-testid="button-whiteboard-increase-width"
            >
              <Plus className="w-4 h-4 text-white" />
            </Button>
          </div>

          {/* Color Palette */}
          {tool === 'pen' && (
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1">
              <Palette className="w-4 h-4 text-white" />
              <div className="flex gap-1">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setColor(c.value)}
                    disabled={!isEnabled}
                    className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${
                      color === c.value ? 'border-white ring-2 ring-white/50' : 'border-white/30'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                    data-testid={`button-color-${c.value}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Status Badge */}
          {!isEnabled && (
            <Badge variant="destructive" className="mr-auto">
              غير مفعّل - الشيخ فقط يمكنه الرسم
            </Badge>
          )}
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-white rounded-lg overflow-hidden relative min-h-[600px]">
          <canvas
            ref={canvasRef}
            className={`w-full h-full ${isEnabled ? 'cursor-crosshair' : 'cursor-not-allowed'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            data-testid="canvas-whiteboard"
          />
          {!isEnabled && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white text-center">
                <Pencil className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold">السبورة غير مفعّلة</p>
                <p className="text-sm opacity-80">الشيخ فقط يمكنه الكتابة على السبورة</p>
              </div>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
});

LiveWhiteboard.displayName = 'LiveWhiteboard';
