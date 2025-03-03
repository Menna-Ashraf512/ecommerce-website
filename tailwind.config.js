/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors:{
        'main':"#33CCCC",
        'secondary':"#f9f0c7",
        'rating':"#ffc908"
      },
      backgroundColor:{
        'gray':"#f1f3f2",
        'rgba':'#f8f9fa64'

      },      
      container:{
        center: true,
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
