import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate, useAnimation } from "framer-motion";
import { PhaseCard, phaseColors } from "./PhaseCard";
import { cn } from "../../lib/utils";

const CARD_WIDTH = 280; // Ancho base de la tarjeta
const GAP = 40; // Espacio extra para calcular el radio

export const PhaseCarousel = ({ phases, expandedPhaseId, onToggle }) => {
    const containerRef = useRef(null);
    const rotation = useMotionValue(0);
    const controls = useAnimation();

    // Configuración geométrica
    const count = phases.length;
    const anglePerCard = 360 / count;
    // Radio: r = w / (2 * tan(pi/n))
    // Añadimos GAP para separarlas un poco
    const radius = Math.round((CARD_WIDTH + GAP) / (2 * Math.tan(Math.PI / count))) + 20;

    // Manejo del arrastre
    // Usamos onPan en el contenedor para evitar que el eje de rotación gire con el objeto 3D
    const handlePan = (event, info) => {
        // Reducimos la sensibilidad de rotación
        const delta = info.delta.x * 0.5;
        rotation.set(rotation.get() + delta);
    };

    const handlePanEnd = (event, info) => {
        const velocity = info.velocity.x;
        const currentRotation = rotation.get();

        // Inercia simple
        const predictedRotation = currentRotation + velocity * 0.2;

        // Snap al ángulo más cercano (múltiplo de anglePerCard)
        const snapAngle = Math.round(predictedRotation / anglePerCard) * anglePerCard;

        animate(rotation, snapAngle, {
            type: "spring",
            stiffness: 50,
            damping: 20,
            restDelta: 0.001
        });
    };

    // Función auxiliar para saber si una tarjeta está visiblemente centrada
    const isCardCentered = (index) => {
        const currentRotation = rotation.get();
        const targetAngle = -index * anglePerCard;

        // Normalizar diferencia de ángulos
        let diff = (currentRotation - targetAngle) % 360;
        if (diff < -180) diff += 360;
        if (diff > 180) diff -= 360;

        return Math.abs(diff) < 20; // Margen de error de 20 grados
    };

    // Al hacer click en una tarjeta
    const handleCardClick = (index, phaseKey) => {
        // 1. Calcular rotación requerida
        const targetAngle = -index * anglePerCard;
        const currentRotation = rotation.get();

        // Encontrar el múltiplo de 360 más cercano
        const cycle = Math.round(currentRotation / 360);
        let adjustedTarget = targetAngle + (cycle * 360);

        // Si la distancia es muy grande, ajustar ciclo para camino más corto
        if (Math.abs(adjustedTarget - currentRotation) > 180) {
            adjustedTarget -= Math.sign(adjustedTarget - currentRotation) * 360;
        }

        // 2. Determinar acción: Rotar o Toggle
        // Si ya está centrada, hacemos toggle. Si no, solo rotamos.
        const wasCentered = isCardCentered(index);

        animate(rotation, adjustedTarget, {
            type: "spring",
            stiffness: 60,
            damping: 20
        });

        if (wasCentered) {
            onToggle(phaseKey);
        }
    };

    return (
        <div className="flex flex-col items-center">

            <div
                ref={containerRef}
                className="relative w-full h-[300px] flex items-center justify-center overflow-visible perspective-[1200px] py-2 touch-none"
                onPan={handlePan}
                onPanEnd={handlePanEnd}
                style={{ touchAction: "none" }}
            >
                {/* Escena 3D */}
                <motion.div
                    style={{
                        rotateY: rotation,
                        transformStyle: "preserve-3d",
                    }}
                    className="relative w-[280px] h-[400px] preserve-3d"
                >
                    {phases.map((phase, i) => {
                        const cardAngle = i * anglePerCard;

                        return (
                            <div
                                key={phase.key}
                                className="absolute inset-0 w-full h-full"
                                style={{
                                    transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                <div
                                    className="w-full h-full transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCardClick(i, phase.key);
                                    }}
                                >
                                    <PhaseCard
                                        phase={phase}
                                        index={i}
                                        isExpanded={expandedPhaseId === phase.key}
                                        onToggle={() => { }} // dummy
                                    />

                                    {/* Reflejo */}
                                    <div className="absolute top-full left-0 right-0 h-24 bg-gradient-to-b from-surface-1/0 to-surface-1/0 transform origin-top scale-y-[-1] opacity-20 pointer-events-none mix-blend-overlay mask-linear-fade" />
                                </div>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Overlay gradients depth */}
                <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-obsidian via-obsidian/50 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-obsidian via-obsidian/50 to-transparent pointer-events-none z-10" />

                {/* Indicador interacción */}
                
            </div>

            {/* Navegación inferior (Bolitas) */}
            <div className="flex gap-4 mt-1 px-4 py-2 bg-surface-1/50 rounded-full border border-surface-3/50 backdrop-blur-sm z-20">
                {phases.map((phase, i) => {
                    const colors = phaseColors[phase.key] || phaseColors['C'];
                    return (
                        <button
                            key={phase.key}
                            onClick={() => handleCardClick(i, phase.key)}
                            className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border cursor-pointer",
                                colors.bg,
                                colors.border,
                                colors.text,
                                expandedPhaseId === phase.key ? "scale-110 ring-2 ring-offset-2 ring-offset-obsidian" : "opacity-60 hover:opacity-100 hover:scale-110"
                            )}
                            title={`Ir a Fase ${phase.letter}: ${phase.title}`}
                        >
                            {phase.letter}
                        </button>
                    )
                })}
            </div>

        </div>
    );
};
