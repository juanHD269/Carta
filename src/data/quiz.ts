export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    question: "¿Donde fue nuestra primera salida solos?",
    options: ["Unicentro", "Nariño", "Novacentro", "Cabrera"],
    correctIndex: 2,
    explanation: "Fuimos por sushi y comimos sandwiches 😌💘",
  },
  {
    id: "q2",
    question: "¿Que palabras puse en la nota de las florez que te di?",
    options: ["Me encantas", "Te quiero", "Pienso en ti", "Para la mujer mas linda"],
    correctIndex: 2,
    explanation: ":3",
  },
  {
    id: "q3",
    question: "¿Cual es la frase iconica de nuestro primer beso?",
    options: ["Tienes miedo", "Tu quieres", "Te amo", "Me da pena"],
    correctIndex: 0,
    explanation: "Jsjsjs fue bonito",
  },
  {
    id: "q4",
    question: "¿Que fue lo primero que me gusto de ti?",
    options: ["Tu forma de ser", "Tu risa", "Todo lo anterior"],
    correctIndex: 2,
    explanation: "Todo lo anterior fue lo primero que me gusto de ti mi amooor",
  },
];
