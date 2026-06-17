import React, { useEffect, useRef, useState } from 'react';
import "./style.css"
import dingSrc from "../music/ding.mp3";
import Win from './win';
const roomContext = require.context('../assets/rooms', false, /\.(png|jpe?g|webp)$/);
const objectContext = require.context('../assets/objects', false, /\.(png|jpe?g|webp)$/);

function toSortedArray(context, prefix) {
    return context.keys()
        .map((key) => {
            const match = key.match(/\((\d+)\)/);
            const num = match ? parseInt(match[1], 10) : 0;
            const mod = context(key);
            const src = mod && mod.default ? mod.default : mod; 
            return { id: `${prefix}-${num}`, num, src };
        })
        .sort((a, b) => a.num - b.num);
}

const BACKGROUNDS = toSortedArray(roomContext, "room");
const OBJECTS = toSortedArray(objectContext, "obj").map((obj) => ({
    ...obj,
    name: `Object ${obj.num}`,
}));

function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

const SPOT_POSITIONS = [
    { top: 25, left: 18 },
    { top: 30, left: 68 },
    { top: 55, left: 30 },
    { top: 60, left: 78 },
    { top: 77, left: 55 },
];

const Challenge = () => {
    const [background, setBackground] = useState(null);
    const [levelObjects, setLevelObjects] = useState([]);
    const [foundIds, setFoundIds] = useState([]);
    const [showWin, setShowWin] = useState(false);
    const dingRef = useRef(null);

    const startNewChallenge = () => {
    const randomBg = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
    const chosenObjects = shuffle(OBJECTS).slice(0, 5);

    const placed = chosenObjects.map((obj, i) => ({
        ...obj,
        top: SPOT_POSITIONS[i].top,
        left: SPOT_POSITIONS[i].left,
    }));

    setBackground(randomBg);
    setLevelObjects(placed);
    setFoundIds([]);
    setShowWin(false);
};

    useEffect(() => {
        startNewChallenge();
    }, []);

    const handleFound = (id) => {
        if (foundIds.includes(id)) return;

        if (dingRef.current) {
            dingRef.current.currentTime = 0;
            dingRef.current.play().catch(() => {});
        }

        const updatedFound = [...foundIds, id];
        setFoundIds(updatedFound);

        if (updatedFound.length === levelObjects.length) {
            setTimeout(() => setShowWin(true), 500);
        }
    };

    if (BACKGROUNDS.length === 0 || OBJECTS.length === 0) {
    return (
        <div style={{ color: "white", padding: 40 }}>
            No images found — BACKGROUNDS: {BACKGROUNDS.length}, OBJECTS: {OBJECTS.length}.
            Check that the require.context paths in this file actually point at your assets/rooms
            and assets/objects folders relative to where Challenge.jsx lives.
        </div>
    );
}
    if (!background) return null;

    return (
        <div className="challenge-wrapper">
            <audio ref={dingRef} src={dingSrc} preload="auto" />

            <div
            className="challenge-background"
            style={{ backgroundImage: `url("${background.src}")` }}
        >
                {levelObjects.map((obj) =>
                    foundIds.includes(obj.id) ? null : (
                        <img
                            key={obj.id}
                            src={obj.src}
                            alt={obj.name}
                            className="hidden-object"
                            style={{ top: `${obj.top}%`, left: `${obj.left}%` }}
                            onClick={() => handleFound(obj.id)}
                        />
                    )
                )}

                <div className="inventory-bar">
                    {levelObjects.map((obj) => (
                        <div key={obj.id} className="inventory-slot">
                            <img
                                src={obj.src}
                                alt={obj.name}
                                className={`inventory-item ${foundIds.includes(obj.id) ? "inventory-item--found" : ""}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {showWin && <Win onNext={startNewChallenge} />}
        </div>
    );
};

export default Challenge;