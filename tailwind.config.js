/*
 * @Author: AiLjx
 * @Date: 2022-08-08 17:11:43
 * @LastEditors: AiLjx
 * @LastEditTime: 2022-08-09 16:34:27
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./styles/**/*.css",
    ],

    theme: {
        extend: {
            // 自定义typography的一些样式
            typography: () => ({
                DEFAULT: {
                    css: [
                        {
                            a: {
                                color: "#0070f3",
                                "text-decoration": "none",
                                "&:hover": {
                                    "text-decoration": "underline",
                                },
                            },
                            code: {
                                "background-color": "#f9f2f4",
                                color: "#c7254e",
                            },
                            "code::before": {
                                display: "none",
                            },
                            "code::after": {
                                display: "none",
                            },
                            "blockquote p:first-of-type::before": {
                                display: "none",
                            },
                            "blockquote p:last-of-type::after": {
                                display: "none",
                            },
                        },
                    ],
                },
            }),
        },
    },
    // variants:控制每个核心插件应该启用哪些变体
    variants: {
        extend: {},
    },
    // 使用typography插件用来美化markdown
    plugins: [require("@tailwindcss/typography")],
};
