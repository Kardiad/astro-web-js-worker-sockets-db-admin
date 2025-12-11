import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function UsersCards() {
    const [users, setUsers] = useState([]);
    const cardsRef = useRef([]);

    cardsRef.current = [];
    const addCard = (el) => {
        if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
    };

    useEffect(() => {
        async function loadUsersAndChiquitadas() {
            // 1. Usuarios
            const res = await fetch("https://randomuser.me/api/?results=10");
            const usersData = await res.json();
            const users = usersData.results;

            // 2. Chiquitadas (una por usuario)
            // Hacemos 10 peticiones paralelas
            const jokes = await Promise.all(
                users.map(() =>
                    fetch("https://chiquitadas.es/api/quotes/avoleorrr", {
                        headers: { Accept: "application/json" }
                    }).then(r => r.json())
                )
            );

            // 3. Unimos usuarios + chiquitadas
            const usersWithJokes = users.map((u, i) => ({
                ...u,
                chiquitada: jokes[i].quote
            }));

            setUsers(usersWithJokes);
        }

        loadUsersAndChiquitadas();
    }, []);

    // 2️⃣ Animación GSAP SOLO si scrolleas hacia abajo
    useEffect(() => {
        if (users.length === 0 || cardsRef.current.length === 0) return;

        const elements = cardsRef.current;

        ScrollTrigger.create({
            trigger: elements[0],
            start: "top bottom",    // cuando el bloque entra en pantalla
            onEnter: ({ direction }) => {
                if (direction === 1) { // solo si scroll es hacia abajo
                    gsap.from(elements, {
                        x: 150,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power3.out"
                    });
                }
            },
            once: true, // solo una vez
        });
    }, [users]);

    return (
        <div style={styles.grid}>
            {users.length === 0 && <p>Cargando usuarios...</p>}

            {users.map((user, i) => (
                <div key={i} ref={addCard} style={styles.card}>
                    <img
                        src={user.picture.large}
                        alt={user.name.first}
                        style={styles.avatar}
                    />
                    <h3>{user.name.first} {user.name.last}</h3>
                    <p>{user.email}</p>
                    <p>{user.location.country}</p>
                    <p>{user.chiquitada}</p>
                </div>
            ))}
        </div>
    );
}

const styles = {
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1rem",
        padding: "3rem 3rem",
    },
    card: {
        padding: "1rem",
        borderRadius: "12px",
        border: "1px solid #ddd",
        background: "#fff",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    },
    avatar: {
        borderRadius: "50%",
        width: "100px"
    }
};
