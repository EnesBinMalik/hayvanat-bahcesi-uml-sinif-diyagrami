import React, { useState, useRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Layers, 
  Download, 
  Info, 
  Check, 
  X,
  FileCode,
  Sparkles
} from 'lucide-react';
import { UML_CLASSES, UML_RELATIONSHIPS } from '../data/umlDiagramData';
import { UMLClassNode } from '../types/uml';

interface UMLDiagramViewerProps {
  onSelectClassForSimulator?: (className: string) => void;
}

export const UMLDiagramViewer: React.FC<UMLDiagramViewerProps> = ({ onSelectClassForSimulator }) => {
  const [selectedClassId, setSelectedClassId] = useState<string | null>('Animal');
  const [zoom, setZoom] = useState<number>(0.85);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 30, y: 15 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showConcreteSpecies, setShowConcreteSpecies] = useState<boolean>(true);
  const [showDTOs, setShowDTOs] = useState<boolean>(true);
  const [copiedNote, setCopiedNote] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const selectedClass = UML_CLASSES.find((c) => c.id === selectedClassId) || null;

  // Filtered classes based on user preferences
  const visibleClasses = UML_CLASSES.filter((c) => {
    if (!showConcreteSpecies && ['Horse', 'Zebra', 'Donkey', 'Tiger', 'Lion', 'Beaver', 'Rat'].includes(c.id)) {
      return false;
    }
    if (!showDTOs && ['DosageResult', 'FeedScheduleResult'].includes(c.id)) {
      return false;
    }
    return true;
  });

  const visibleClassIds = new Set(visibleClasses.map((c) => c.id));
  const visibleRelationships = UML_RELATIONSHIPS.filter(
    (r) => visibleClassIds.has(r.sourceId) && visibleClassIds.has(r.targetId)
  );

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag if clicking on background, not on a class card
    if ((e.target as HTMLElement).closest('.uml-class-node')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResetZoom = () => {
    setZoom(0.85);
    setPan({ x: 30, y: 15 });
  };

  const handleExportSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'Hayvanat_Bahcesi_UML_Enes_Ozturk.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);

    setCopiedNote('UML Diyagramı SVG formatında indirildi!');
    setTimeout(() => setCopiedNote(null), 3000);
  };

  // Helper to compute orthogonal or direct paths between class center points
  const getConnectorPath = (source: UMLClassNode, target: UMLClassNode, type: string) => {
    // Calculate attachment points
    let sx = source.x + source.width / 2;
    let sy = source.y;
    let tx = target.x + target.width / 2;
    let ty = target.y + target.height;

    // Special case for side-by-side or controller
    if (source.id === 'ZooManagementSystem' && target.id === 'Animal') {
      sx = source.x + source.width;
      sy = source.y + 120;
      tx = target.x;
      ty = target.y + 120;
      return `M ${sx} ${sy} L ${tx} ${ty}`;
    }

    if (source.id === 'Animal' && target.id === 'DosageResult') {
      sx = source.x + source.width;
      sy = source.y + 90;
      tx = target.x;
      ty = target.y + 90;
      return `M ${sx} ${sy} L ${tx} ${ty}`;
    }

    if (source.id === 'Animal' && target.id === 'FeedScheduleResult') {
      sx = source.x + source.width;
      sy = source.y + 160;
      const midX = (sx + target.x) / 2;
      return `M ${sx} ${sy} H ${midX} V ${target.y + 110} H ${target.x}`;
    }

    // Default vertical inheritance: from top of child to bottom of parent
    if (type === 'inheritance') {
      sy = source.y;
      ty = target.y + target.height;
      const midY = (sy + ty) / 2;
      return `M ${sx} ${sy} V ${midY} H ${tx} V ${ty}`;
    }

    return `M ${sx} ${sy} L ${tx} ${ty}`;
  };

  return (
    <div className="relative flex flex-col h-[750px] w-full rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
      {/* Top Diagram Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5 backdrop-blur-md z-20 gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Resmi UML 2.5 Standart Sınıf Diyagramı
          </span>
          <span className="hidden sm:inline-block rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] font-mono text-amber-300 border border-amber-500/20">
            Polymorphism Contract
          </span>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Filter Toggles */}
          <button
            onClick={() => setShowConcreteSpecies(!showConcreteSpecies)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border ${
              showConcreteSpecies
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Somut tür sınıflarını (Horse, Zebra, Tiger vb.) göster/gizle"
          >
            <Layers className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Somut Türler</span>
          </button>

          <button
            onClick={() => setShowDTOs(!showDTOs)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border ${
              showDTOs
                ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Dönüş DTO sınıflarını göster/gizle"
          >
            <FileCode className="h-3.5 w-3.5" />
            <span className="hidden md:inline">DTO Sınıfları</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-700 mx-1" />

          {/* Zoom controls */}
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.1, 1.6))}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Yakınlaştır (Zoom In)"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <span className="text-[11px] font-mono text-slate-400 w-10 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.1, 0.4))}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Uzaklaştır (Zoom Out)"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Görünümü Sıfırla"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <div className="h-4 w-[1px] bg-slate-700 mx-1" />

          {/* Export SVG */}
          <button
            onClick={handleExportSVG}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm"
            title="Diyagramı SVG Olarak İndir"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">SVG İndir</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {copiedNote && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xl animate-bounce">
          <Check className="h-4 w-4" />
          {copiedNote}
        </div>
      )}

      {/* Main Canvas Area */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={`relative flex-1 overflow-hidden select-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
          className="relative min-w-[1550px] min-h-[950px] p-6"
        >
          {/* SVG Connector Layer (UML Lines and Arrows) */}
          <svg
            ref={svgRef}
            className="absolute inset-0 pointer-events-none w-full h-full"
            style={{ width: '1600px', height: '1000px' }}
          >
            <defs>
              {/* UML Generalization Arrowhead: Hollow triangle with white/dark fill */}
              <marker
                id="uml-inheritance"
                markerWidth="16"
                markerHeight="16"
                refX="16"
                refY="8"
                orient="auto"
              >
                <polygon points="0 2, 16 8, 0 14" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
              </marker>

              {/* UML Subclass to family inheritance arrow */}
              <marker
                id="uml-sub-inheritance"
                markerWidth="14"
                markerHeight="14"
                refX="14"
                refY="7"
                orient="auto"
              >
                <polygon points="0 2, 14 7, 0 12" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.8" />
              </marker>

              {/* UML Aggregation Diamond (Hollow diamond) for ZooManagementSystem -> Animal */}
              <marker
                id="uml-aggregation"
                markerWidth="20"
                markerHeight="16"
                refX="0"
                refY="8"
                orient="auto"
              >
                <polygon points="0 8, 8 3, 16 8, 8 13" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
              </marker>

              {/* UML Dependency Arrow (Open dashed line arrow) */}
              <marker
                id="uml-dependency"
                markerWidth="12"
                markerHeight="12"
                refX="11"
                refY="6"
                orient="auto"
              >
                <polyline points="2 2, 11 6, 2 10" fill="none" stroke="#60a5fa" strokeWidth="1.8" />
              </marker>
            </defs>

            {/* Render UML Relationship Lines */}
            {visibleRelationships.map((rel) => {
              const source = UML_CLASSES.find((c) => c.id === rel.sourceId);
              const target = UML_CLASSES.find((c) => c.id === rel.targetId);
              if (!source || !target) return null;

              const path = getConnectorPath(source, target, rel.type);

              if (rel.type === 'inheritance') {
                const isFamilyToAnimal = target.id === 'Animal';
                return (
                  <g key={rel.id}>
                    <path
                      d={path}
                      fill="none"
                      stroke={isFamilyToAnimal ? '#f59e0b' : '#64748b'}
                      strokeWidth={isFamilyToAnimal ? 2.2 : 1.6}
                      markerEnd={isFamilyToAnimal ? 'url(#uml-inheritance)' : 'url(#uml-sub-inheritance)'}
                      className="transition-all hover:stroke-amber-400"
                    />
                    {rel.label && (
                      <text
                        x={(source.x + target.x) / 2 + 10}
                        y={(source.y + target.y) / 2}
                        fill="#f59e0b"
                        fontSize="11"
                        fontFamily="monospace"
                        className="bg-slate-900 px-1"
                      >
                        {rel.label}
                      </text>
                    )}
                  </g>
                );
              }

              if (rel.type === 'aggregation') {
                return (
                  <g key={rel.id}>
                    <path
                      d={path}
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="2"
                      markerStart="url(#uml-aggregation)"
                    />
                    <text
                      x={source.x + source.width + 12}
                      y={source.y + 115}
                      fill="#c084fc"
                      fontSize="11"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {rel.label} [0..*]
                    </text>
                  </g>
                );
              }

              if (rel.type === 'dependency') {
                return (
                  <g key={rel.id}>
                    <path
                      d={path}
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="1.5"
                      strokeDasharray="5,5"
                      markerEnd="url(#uml-dependency)"
                    />
                    <text
                      x={target.x - 38}
                      y={target.y + 70}
                      fill="#93c5fd"
                      fontSize="10"
                      fontFamily="monospace"
                      fontStyle="italic"
                    >
                      «use»
                    </text>
                  </g>
                );
              }

              return null;
            })}
          </svg>

          {/* UML Class Nodes (Standard 3-Compartment Rectangles) */}
          {visibleClasses.map((cls) => {
            const isSelected = selectedClassId === cls.id;
            const isAbstract = cls.isAbstract;

            return (
              <div
                key={cls.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedClassId(cls.id);
                }}
                style={{
                  position: 'absolute',
                  left: `${cls.x}px`,
                  top: `${cls.y}px`,
                  width: `${cls.width}px`,
                }}
                className={`uml-class-node group cursor-pointer rounded-xl border-2 transition-all duration-150 shadow-lg ${
                  isSelected
                    ? 'ring-4 ring-amber-400/50 shadow-amber-500/20 ' + cls.colorTheme.border
                    : cls.colorTheme.border + ' hover:border-amber-400/80 hover:shadow-xl'
                } ${cls.colorTheme.bodyBg}`}
              >
                {/* 1. Header Compartment: Stereotype & Class Name */}
                <div
                  className={`border-b-2 ${cls.colorTheme.border} ${cls.colorTheme.headerBg} p-2.5 text-center rounded-t-[10px]`}
                >
                  {cls.stereotype && (
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      «{cls.stereotype}»
                    </div>
                  )}
                  <div
                    className={`text-sm sm:text-base font-extrabold tracking-wide ${cls.colorTheme.headerText} ${
                      isAbstract ? 'italic font-serif' : ''
                    }`}
                  >
                    {cls.name}
                  </div>
                  {cls.category !== 'core' && cls.category !== 'dto' && (
                    <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                      {cls.description}
                    </div>
                  )}
                </div>

                {/* 2. Attributes Compartment (Fields & Properties) */}
                {cls.attributes.length > 0 && (
                  <div className="border-b border-slate-800/80 p-2.5 space-y-1 bg-slate-950/40">
                    <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400/90 font-semibold mb-1">
                      -- Öznitelikler (Attributes) --
                    </div>
                    {cls.attributes.map((attr) => (
                      <div
                        key={attr.id}
                        className="flex items-center justify-between text-xs font-mono font-medium text-slate-300 hover:text-white"
                        title={attr.description}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span
                            className={
                              attr.visibility === '+'
                                ? 'text-emerald-400 font-bold'
                                : attr.visibility === '-'
                                ? 'text-rose-400 font-bold'
                                : 'text-amber-400 font-bold'
                            }
                          >
                            {attr.visibility}
                          </span>
                          <span className="text-slate-200">{attr.name}</span>
                          <span className="text-slate-400">: {attr.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. Operations / Methods Compartment */}
                {cls.methods.length > 0 && (
                  <div className="p-2.5 space-y-1 bg-slate-900/30 rounded-b-[10px]">
                    <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400/90 font-semibold mb-1 flex items-center justify-between">
                      <span>-- İşlemler (Methods) --</span>
                      {cls.methods.some((m) => m.isAbstract) && (
                        <span className="text-[9px] text-amber-400 italic">
                          *İtalik = {`{abstract}`}
                        </span>
                      )}
                    </div>
                    {cls.methods.map((method) => {
                      const isPolymorphicCore =
                        method.name === 'getDosage' || method.name === 'getFeedSchedule';
                      return (
                        <div
                          key={method.id}
                          className={`rounded px-1.5 py-0.5 text-xs font-mono transition-colors ${
                            isPolymorphicCore
                              ? 'bg-amber-500/15 border border-amber-500/30 text-amber-200'
                              : 'text-slate-300 hover:bg-slate-800/60'
                          }`}
                          title={method.description}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <div className="flex items-center gap-1 truncate">
                              <span
                                className={
                                  method.visibility === '+'
                                    ? 'text-emerald-400 font-bold'
                                    : 'text-rose-400 font-bold'
                                }
                              >
                                {method.visibility}
                              </span>
                              <span
                                className={`font-semibold ${
                                  method.isAbstract ? 'italic text-amber-300' : 'text-slate-100'
                                }`}
                              >
                                {method.name}
                              </span>
                              <span className="text-slate-400">
                                (
                                {method.parameters
                                  .map((p) => `${p.name}: ${p.type}`)
                                  .join(', ')}
                                )
                              </span>
                              {method.returnType && (
                                <span className="text-cyan-300">: {method.returnType}</span>
                              )}
                            </div>

                            {method.isAbstract && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                                {'{abstract}'}
                              </span>
                            )}
                            {method.isOverride && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                                {'{override}'}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Architectural Drawing Title Block / Cartouche (ENES ÖZTÜRK İMZASI) */}
          <div
            style={{ position: 'absolute', right: '40px', bottom: '30px', width: '420px' }}
            className="rounded-xl border-2 border-amber-500/60 bg-slate-950/95 p-3.5 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400 ring-2 ring-amber-400/30" />
                <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
                  YAZILIM MİMARİ BAŞLIK BLOĞU
                </span>
              </div>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-mono text-emerald-300 font-semibold">
                REV: 1.0 (ONAYLI)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block">PROJE:</span>
                <span className="text-slate-200 font-bold">Hayvanat Bahçesi Takip Sistemi</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">TASARIM VE MİMARİ:</span>
                <span className="text-amber-300 font-extrabold text-sm underline decoration-amber-500/50">
                  Enes Öztürk
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">UYGULANAN DESEN:</span>
                <span className="text-cyan-300">Object-Oriented Polymorphism</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">POLİMORFİK ÇEKİRDEK:</span>
                <span className="text-emerald-300">getDosage() & getFeedSchedule()</span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
              <span>ISO/IEC 19505 UML 2.5 Standartlarına Uygundur</span>
              <span className="font-semibold text-amber-400/90 font-mono">İmza: Enes Öztürk ✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Class Inspector Drawer (When a class is selected) */}
      {selectedClass && (
        <div className="border-t border-slate-800 bg-slate-900/95 p-3.5 backdrop-blur-md z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Seçili Sınıf:</span>
                <span className="text-sm font-bold text-white font-mono">{selectedClass.name}</span>
                {selectedClass.stereotype && (
                  <span className="text-[10px] rounded bg-slate-800 px-1.5 py-0.5 text-amber-300 font-mono">
                    «{selectedClass.stereotype}»
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">{selectedClass.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {['Equine', 'Felid', 'Rodent', 'Horse', 'Tiger', 'Beaver'].includes(selectedClass.id) &&
              onSelectClassForSimulator && (
                <button
                  onClick={() => onSelectClassForSimulator(selectedClass.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-amber-500/20"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Bu Sınıfı Simülatörde Test Et
                </button>
              )}
            <button
              onClick={() => setSelectedClassId(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              title="Kapat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* UML Legend Strip */}
      <div className="border-t border-slate-800/80 bg-slate-950 px-4 py-2 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-semibold text-slate-300">UML Gösterim Notasyonu:</span>
          <span className="flex items-center gap-1">
            <span className="text-emerald-400 font-bold font-mono">+</span> Public
          </span>
          <span className="flex items-center gap-1">
            <span className="text-rose-400 font-bold font-mono">-</span> Private
          </span>
          <span className="flex items-center gap-1">
            <span className="text-amber-400 font-bold font-mono">#</span> Protected
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full border border-amber-400 bg-amber-400/20" /> İçi Boş Üçgen Ok: Kalıtım (Inheritance)
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rotate-45 border border-purple-400 bg-purple-400/20" /> İçi Boş Baklava: Kümeleme (Aggregation)
          </span>
          <span className="flex items-center gap-1">
            <span className="border-b border-dashed border-blue-400 w-3" /> Kesikli Ok: Bağımlılık (Dependency)
          </span>
        </div>
        <div className="font-mono text-[10px] text-amber-400">
          Enes Öztürk İmzalı Mimari Tasarım
        </div>
      </div>
    </div>
  );
};
