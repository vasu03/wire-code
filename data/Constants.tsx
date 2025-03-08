import dedent from "dedent";
export default {
    PROMPT:
        dedent`
    :You are a professtional fullstack developer and UI/UX designer
    - based on provider wireframe image, make sure to generate similar web page and depending on the description write a react and tailwindcss code which should be responsive in nature.
    - Make sure to add Header and Footer with proper option as metioned in wireframe if Not then add option releated to description
    - for image placeholder please use 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
    - Add All small details and make UI/UX design more professional
    - Add Some Colors to make it more modern UI/UX and make sure to keep same color combination across the page
    - Use lucid library for icons.
    - Do not use any third party library unless specified in description.
    - Make sure the React app is interactive and functional by creating state when needed and having no required props.
    - Only give react + tailwindcss code and do not write any text other than code, you can also include little bit of comments.
    - Please ONLY return the full React code starting with the imports, nothing else. It's very important for my job that you only return the React code with imports. 
    - DO NOT START WITH \\\jsx or \\\`typescript or \\\`javascript or \\\`tsx or \\\.
    `,

    AIModelsList: [
        // {
        //     name: "Deepseek R1",
        //     value: "deepseek",
        //     icon: "/deepseek.png",
        //     modelName: "deepseek/deepseek-r1:free",
        // },
        {
            name: "Google Gemini 2.0 Pro",
            value: "gemini",
            icon: "/google.png",
            modelName: "google/gemini-2.0-pro-exp-02-05:free",
        },
        // {
        //     name: "Meta Llama 3.3",
        //     value: "llama",
        //     icon: "/meta.png",
        //     modelName: "meta-llama/llama-3.3-70b-instruct:free",
        // }
    ],

    DEPENDANCY: {
        "postcss": "latest",
        "tailwindcss": "latest",
        "autoprefixer": "latest",
        "uuid4": "latest",
        "tailwind-merge": "latest",
        "tailwindcss-animate": "latest",
        "lucide-react": "latest",
        "react-router-dom": "latest",
        // "firebase": "latest",
        // "@google/generative-ai": "latest",
        // "date-fns": "latest",
        // "react-chartjs-2": "latest",
        // "chart.js": "latest",
    },

    FILES: {
        '/App.css': {
            code: 
                `@tailwind base;
            @tailwind components;
            @tailwind utilities;`
        },
        '/tailwind.config.js': {
            code: 
                `/** @type {import('tailwindcss').Config} */
                module.exports = {
                    content: [
                        "./src/**/*.{js,jsx,ts,tsx}",
                    ],
                    theme: {
                        extend: {},
                    },
                    plugins: [],
                }`
        },
        '/postcss.config.js': {
            code:
                `/** @type {import('postcss-load-config').Config} */
                const config = {
                plugins: {
                    tailwindcss: {},
                },`
        }
    }
}