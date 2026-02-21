import React, { useState } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef(({ className, sideOffset = 4, children, ...props }, ref) => (
    <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                "z-50 overflow-hidden rounded-md border border-surface-3 bg-deep-slate px-3 py-2 text-sm text-ghost-white shadow-xl shadow-obsidian/50 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-electric-cyan/20",
                className
            )}
            {...props}
        >
            {children}
        </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// ─── Concept Glossary ────────────────────────────────────────────────────────

const glossary = {
    "omni-rol": "Configuración integral de la identidad, audiencia, intención y conocimiento del modelo para reducir ruido teatral y enfocar sus cálculos en un subespacio de datos útil.",
    "clústeres específicos de procesamiento": "Redes de neuronas virtuales latentes agrupadas por temática (ej. 'vocabulario médico' o 'lógica deductiva') que el modelo activa de forma conjunta al identificar un patrón en el prompt.",
    "trade-offs": "Decisiones de compromiso: renunciar a una ventaja (ej. velocidad) para obtener otra (ej. calidad). Es obligar a la IA a elegir el mal menor en lugar de darle una solución mágica e irreal.",
    "síndrome del impostor": "Bloqueo mental del usuario al redactar: no saber qué 'experto' pedirle a la IA por falta de conocimientos previos en ese sector. Se soluciona delegando en la IA la propia elección del experto ideal.",
    "espacio de búsqueda del modelo": "El conjunto de todas las posibles palabras y lógicas que el LLM podría elegir para responder a tu petición. Restringirlo hace que sea más rápido y preciso.",
    "clústeres latentes": "Grupos de conceptos que el modelo aprendió juntos durante su entrenamiento masivo (p. ej., 'abogado' se agrupa instintivamente con 'código penal' y 'formalidad').",
    "heurísticas": "Reglas mentales o atajos prácticos que usa un profesional para resolver problemas del día a día en su sector.",
    "deducción abductiva": "Llegar a la conclusión más probable a partir de una observación incompleta (ej. deducir dónde estuvo alguien fijándote en el barro de un zapato).",
    "arquitectura cognitiva": "La 'forma de pensar' que le obligamos a usar al modelo, activando sus redes neuronales técnicas en lugar de su lado charlatán conversacional.",
    "domain priming": "Preparar mentalmente al modelo dándole el 'campo de conocimiento' exacto en el prompt de sistema, sin pedirle que actúe o dramatice como una persona concreta."
}

export const ConceptTooltip = ({ term, children }) => {
    const conceptKey = term.trim().toLowerCase();
    const explanation = glossary[conceptKey];

    const [isOpen, setIsOpen] = useState(false);

    // Si no hay explicación para este término, renderizamos el children normal
    if (!explanation) {
        return <>{children}</>;
    }

    return (
        <TooltipProvider delayDuration={150}>
            <Tooltip open={isOpen} onOpenChange={setIsOpen}>
                <TooltipTrigger asChild>
                    <span
                        className="relative cursor-help text-electric-cyan font-medium border-b border-dashed border-electric-cyan/40 hover:border-electric-cyan transition-colors"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsOpen(!isOpen);
                        }}
                    >
                        {children}
                    </span>
                </TooltipTrigger>
                <TooltipContent
                    side="top"
                    align="center"
                    className="max-w-xs flex items-start gap-2"
                    onPointerDownOutside={() => setIsOpen(false)}
                >
                    <Info className="w-4 h-4 text-electric-cyan shrink-0 mt-0.5" />
                    <p className="leading-relaxed text-[0.9rem] text-ghost-white/90">
                        <span className="font-bold text-electric-cyan mb-1 block capitalize">{term}</span>
                        {explanation}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
