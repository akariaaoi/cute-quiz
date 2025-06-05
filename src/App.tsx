import React, { useState } from "react";
import { motion } from "framer-motion";

// 題目資料
const questions = [
  {
    question: "1. 你在朋友眼中是怎樣的人？",
    options: [
      { text: "獨立冷靜", type: "cat" },       // 🐱
      { text: "熱情忠誠", type: "dog" },       // 🐶
      { text: "溫柔敏感", type: "rabbit" },    // 🐰
      { text: "謹慎安靜", type: "hedgehog" },  // 🦔
    ],
  },
  {
    question: "2. 你週末最喜歡做什麼？",
    options: [
      { text: "冒險探索新地方", type: "fox" }, // 🦊
      { text: "和朋友出去玩", type: "dog" },    // 🐶
      { text: "在家閱讀或看電影", type: "cat" }, // 🐱
      { text: "靜靜創作或寫日記", type: "rabbit" }, // 🐰
    ],
  },
  {
    question: "3. 你面對壓力時的反應是？",
    options: [
      { text: "用行動轉移注意力", type: "fox" }, // 🦊
      { text: "和朋友聊天紓壓", type: "dog" },   // 🐶
      { text: "自己默默消化情緒", type: "hedgehog" }, // 🦔
      { text: "寫下感受理清思緒", type: "rabbit" }, // 🐰
    ],
  },
  {
    question: "4. 你最重視什麼？",
    options: [
      { text: "情感與理解", type: "rabbit" },     // 🐰
      { text: "自由與空間", type: "cat" },        // 🐱
      { text: "友情與陪伴", type: "dog" },        // 🐶
      { text: "安全感與界線", type: "hedgehog" }, // 🦔
    ],
  },
  {
    question: "5. 你最嚮往哪種生活方式？",
    options: [
      { text: "新奇多變、充滿挑戰", type: "fox" },     // 🦊
      { text: "安靜獨處、自我成長", type: "cat" },      // 🐱
      { text: "溫馨陪伴、穩定關係", type: "dog" },      // 🐶
      { text: "熟悉環境中安心創作", type: "hedgehog" }, // 🦔
    ],
  },
];



// 結果資料
const results: Record<
  string,
  { title: string; emoji: string; description: string; image: string }
> = {
  cat: {
    title: "你是優雅內斂的貓咪",
    emoji: "🐱",
    description:
      "你享受獨處的時光，有自己的一套思考方式，雖然表面安靜，但內心豐富。朋友們欣賞你的神秘與獨立。",
    image: "/images/cat.png",
  },
  dog: {
    title: "你是活力滿滿的狗狗",
    emoji: "🐶",
    description:
      "你外向、友善，總能帶給人正能量。你樂於參與群體活動，是朋友眼中不可或缺的開心果。",
    image: "/images/dog.png",
  },
  fox: {
    title: "你是聰明機靈的狐狸",
    emoji: "🦊",
    description:
      "你反應快、觀察力強，能在不同環境中靈活應對。你喜歡新奇事物，總是讓人捉摸不定。",
    image: "/images/fox.png",
  },
  rabbit: {
    title: "你是溫柔創意的兔兔",
    emoji: "🐰",
    description:
      "你敏感細膩、喜歡幻想，有藝術家的氣質。你用心對待他人，擁有讓人安心的氣場。",
    image: "/images/rabbit.png",
  },
  hedgehog: {
    title: "你是謹慎敏感的刺蝟",
    emoji: "🦔",
    description:
      "你看似內向防備，其實有溫暖柔軟的一面。你需要安全與界線來感到安心，當你信任別人時，就會展現無比真誠。",
    image: "/images/hedgehog.png",
  },
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    cat: 0,
    dog: 0,
    fox: 0,
    rabbit: 0,
    hedgehog: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (type: keyof typeof scores) => {
    setScores((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      rabbit: 0,
      hedgehog: 0,
    });
    setShowResult(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 p-6 font-sans">
      <div className="bg-white bg-opacity-80 rounded-3xl shadow-xl w-full max-w-xl p-8">
        {showResult ? (
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <img
              src={results[getResult()].image}
              alt="animal"
              className="w-32 h-32 rounded-full border-4 border-pink-300 shadow-lg mb-4 object-cover"
            />
            <h2 className="text-2xl font-bold text-pink-700 mb-2">
              {results[getResult()].emoji} {results[getResult()].title}
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              {results[getResult()].description}
            </p>
            <button
              onClick={handleRestart}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition"
            >
              🔁 再玩一次
            </button>
          </motion.div>
        ) : (
          <div>
            <motion.h1
              className="text-2xl font-bold mb-6 text-center text-gray-800"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {questions[currentQuestion].question}
            </motion.h1>
            <div className="grid grid-cols-1 gap-4">
              {questions[currentQuestion].options.map((opt, index) => (
                <motion.button
                  key={index}
                  onClick={() =>
                    handleAnswer(opt.type as keyof typeof scores)
                  }
                  className="w-full p-4 bg-white border border-gray-300 rounded-2xl shadow hover:shadow-lg hover:bg-pink-50 transition text-lg font-medium text-gray-800"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {opt.text}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
