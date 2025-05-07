
# ⚡ Consumption Calculator by Mooyi

## 🧾 Overview  
The **Consumption Calculator** is a web application designed to calculate electricity bills based on kilowatt-hour (KWH) consumption. It dynamically updates bill charges based on user input and displays detailed breakdowns of costs, including supplier-related charges, government charges, and subsidies.

## ✨ Features
- 📱 Responsive design for desktop and mobile  
- ⚙️ Real-time bill calculation  
- 🧮 Breakdown of charges (distribution, supply, metering, taxes, subsidies)  
- 🧑‍💻 User-friendly interface

## 🛠️ Technologies Used
- 🧱 **HTML** – Structure and layout  
- 🎨 **CSS** – Styling and responsive design  
- 📟 **JavaScript** – Dynamic calculations and interactions  
- 🔧 **jQuery** – Simplifies DOM manipulation

## 📁 File Structure
```
project-folder/
│── index.html          # Main HTML file
│── styles.css          # Stylesheet for UI design
│── formula.js          # JavaScript file for calculations
│── jquery-3.7.1.min.js # jQuery library
```

## 🚀 Installation & Usage

### 🧬 Step 1: Clone the Repository
```sh
git clone https://github.com/your-repository-url.git
cd project-folder
```

### 🌐 Step 2: Open in Browser  
Simply open `index.html` in a browser to start using the calculator.

## 🔍 How It Works
1. 🖊️ Enter the KWH value in the input field  
2. 🔄 The system automatically updates all charges based on predefined rates  
3. 💸 The total bill is displayed at the bottom

## ⚙️ Customization
To modify rates, edit the `formula.js` file:
```js
const charges = {
    distCharge: 0.2748,
    suppCharge: 0.4140,
    meterCharge: 0.3460,
    // Update rates as needed
};
```

## 📜 License  
This project is open-source under the MIT License.

## 👤 Author  
Developed by **Mooyi**. Contributions are welcome!
