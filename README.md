#  Fraction Quiz - Interactive Learning Game

An engaging, visual web-based quiz game that teaches fraction addition and subtraction to students in grades 4-7 through interactive slice manipulation.

## ✨ Features

https://github.com/user-attachments/assets/1e20d065-5d1f-4191-aceb-00df9a6de3bc


### 🎮 Interactive Gameplay

- **Drag & Drop Interface**: Visually manipulate slices to understand fraction operations
- **5 Quiz Questions**: Mix of 3 addition and 2 subtraction problems
- **Real-time Feedback**: Instant validation of answers with encouraging messages
- **Score Tracking**: Keep track of correct answers throughout the quiz

### 📚 Educational Design

- **Visual Learning**: diagrams help students visualize fractions
- **Same Denominator**: All problems use fractions with matching denominators
- **Proper Fractions**: Addition problems ensure results stay under 1 (numerator < denominator)
- **Step-by-Step Hints**: Built-in hint system explains the solution process

### 🎨 User Interface

- **Vertical Fraction Input**: Natural top/bottom layout mimics traditional fraction writing
- **Color-Coded Slices**:
  - 🔵 Blue for first fraction (A)
  - 🔴 Red for second fraction (B)
  - 🟢 Green for result (Addition)
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: Professional transitions and hover effects

## 🎥 Demo
<img width="1909" height="870" alt="image" src="https://github.com/user-attachments/assets/57a4c4db-03c6-4b33-aa22-59cd5f81a349" />

<img width="1895" height="868" alt="image" src="https://github.com/user-attachments/assets/147df96e-db28-4f00-b739-79a142661896" />

<img width="1884" height="873" alt="image" src="https://github.com/user-attachments/assets/a2d2582f-493e-4a45-a646-5b1f22a55eed" />

<img width="1894" height="875" alt="image" src="https://github.com/user-attachments/assets/01b944d7-3e53-477d-bea8-fb4a6d692052" />

<img width="1888" height="876" alt="image" src="https://github.com/user-attachments/assets/663921df-0a3b-4570-9c1f-83139050e837" />

<img width="1887" height="871" alt="image" src="https://github.com/user-attachments/assets/4e80db60-97c2-4ad6-8f49-d30b38916f49" />

<img width="1919" height="863" alt="image" src="https://github.com/user-attachments/assets/23f430fc-f0c3-4113-8a86-14526213d9eb" />


### Addition Problem

```
2/5 + 1/5 = ?
```

- Drag blue slices from A to result
- Drag red slices from B to result
- Watch the result fill with green slices
- Enter 3/5 and check your answer!

### Subtraction Problem

```
4/7 - 2/7 = ?
```

- Drag red slices from B to blue slices in A
- Watch both slices disappear (cancellation)
- Count remaining blue slices
- Enter 2/7 and check your answer!

## 🚀 Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or dependencies required!

### Steps

1. **Download the files**

   ```bash
   # Clone or download the repository
   git clone https://github.com/yourusername/fraction--quiz.git
   cd fraction--quiz
   ```

2. **File Structure**

   ```
   fraction--quiz/
   ├── index.html
   ├── style.css
   ├── script.js
   └── README.md
   ```

3. **Run the application**
   - Simply open `index.html` in your web browser
   - No build process or installation needed!

## 🎯 How to Play

### Getting Started

1. **Start Screen**: Click the "🚀 Start Quiz" button
2. **Read the Problem**: Look at the fraction operation displayed
3. **Visual Manipulation**:
   - **For Addition**: Drag slices from both s A and B to the result
   - **For Subtraction**: Drag red slices from B onto blue slices in A
4. **Enter Answer**: Type the numerator and denominator in the vertical fraction input
5. **Check**: Click "✓ Check" to validate your answer
6. **Next**: Proceed to the next question
7. **Complete**: View your final score after 5 questions

### Controls

- **Mouse**: Click and drag slices between s
- **Hint Button**: Get step-by-step explanation
- **Next Button**: Move to the next question (appears after answering)

## 📁 Project Structure

### index.html

Main HTML structure containing:

- Start screen with quiz introduction
- Quiz screen with canvases and input fields
- Final score screen with results

### style.css

Styling includes:

- Gradient background and modern card design
- Responsive layout for all screen sizes
- Button hover effects and animations
- Vertical fraction input styling
- Color-coded feedback messages

### script.js

JavaScript logic handles:

- Question generation with constraints
- Canvas drawing for visualization
- Drag-and-drop functionality
- Answer validation and scoring
- Screen transitions and game flow

## 🛠️ Technologies Used

- **HTML5**: Structure and Canvas API for drawing
- **CSS3**: Modern styling with flexbox, gradients, and animations
- **Vanilla JavaScript**: No frameworks or libraries required
- **Canvas API**: Dynamic slice rendering

## 🎲 Game Mechanics

### Question Generation

```javascript
// Addition: numA + numB < denominator (proper fractions)
// Example: 2/5 + 1/5 = 3/5 ✅
// Never: 3/5 + 4/5 = 7/5 ❌

// Subtraction: numA >= numB (positive results)
// Example: 4/7 - 2/7 = 2/7 ✅
```

### Representation

- Each is divided into equal slices (denominator)
- Filled slices represent the numerator
- All three s use the same denominator in each question

### Drag Logic

**Addition (+)**:

- Source: s A and B
- Target: Result
- Effect: Slices turn green in result

**Subtraction (−)**:

- Source: B (red slices)
- Target: A (blue slices)
- Effect: Both slices disappear (cancellation)

### Answer Validation

- Accepts simplified fractions (e.g., 2/4 = 1/2)
- Uses GCD algorithm for fraction simplification
- Provides correct answer if user is wrong

## 🎓 Educational Objectives

### Learning Goals

1. **Visual Understanding**: See fractions as parts of a whole
2. **Operation Mastery**: Practice addition and subtraction with like denominators
3. **Simplification**: Recognize equivalent fractions
4. **Problem Solving**: Apply drag-and-drop to verify operations

### Skill Development

- **Grade 4-5**: Introduction to fraction operations
- **Grade 6-7**: Reinforcement and speed improvement
- **Visual Learners**: Concrete representation of abstract concepts

### Curriculum Alignment

- **CCSS.MATH.CONTENT.4.NF.B.3**: Add and subtract fractions with like denominators
- **CCSS.MATH.CONTENT.5.NF.A.1**: Add and subtract fractions with unlike denominators

## 🌐 Browser Compatibility

| Browser | Version | Status             |
| ------- | ------- | ------------------ |
| Chrome  | 90+     | ✅ Fully Supported |
| Firefox | 88+     | ✅ Fully Supported |
| Safari  | 14+     | ✅ Fully Supported |
| Edge    | 90+     | ✅ Fully Supported |
| Opera   | 76+     | ✅ Fully Supported |

### Mobile Support

- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+

## 🎨 Customization

### Modify Difficulty

Edit `script.js` line 14-15:

```javascript
// Change number of questions
const operations = ["+", "+", "+", "-", "-"]; // 5 questions

// Change denominator range (3-7 default)
const den = Math.floor(Math.random() * 5) + 3;
```

### Change Colors

Edit `script.js` draw function:

```javascript
if (sliceArr[i] === 1) {
	ctx.fillStyle = "#667eea"; // Change blue color
} else if (sliceArr[i] === 2) {
	ctx.fillStyle = "#e94e3d"; // Change red color
} else if (sliceArr[i] === 3) {
	ctx.fillStyle = "#34a853"; // Change green color
}
```

### Adjust Canvas Size

Edit `index.html` and `style.css`:

```html
<!-- index.html -->
<canvas id="A" width="200" height="200"></canvas>
```

## 🐛 Troubleshooting

### Slices Won't Drag

- **Issue**: Mouse events not registering
- **Solution**: Ensure JavaScript is enabled and no console errors exist

### Answer Not Accepted

- **Issue**: Correct answer shows as incorrect
- **Solution**: Make sure fraction is in lowest terms (simplify)

### Not Drawing

- **Issue**: Blank white circles
- **Solution**: Check browser console for Canvas API errors

### Mobile Touch Issues

- **Issue**: Drag doesn't work on touch devices
- **Solution**: Currently optimized for mouse; touch support can be added

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Feature Ideas

- [ ] Touch/mobile drag support
- [ ] Sound effects for correct/incorrect answers
- [ ] Different difficulty levels
- [ ] Multiplayer mode
- [ ] Progress tracking across sessions
- [ ] Different fraction operations (multiplication, division)
- [ ] Unlike denominators (advanced mode)

## 👨‍💻 Author

Created with **Gyanthakur** ❤️ for students learning fractions

## 🙏 Acknowledgments

- emoji inspiration for making math fun
- Canvas API for powerful 2D graphics
- Teachers and students who inspired this project

## 📞 Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Email: gps.96169@gmail.com
  

---

**Happy Learning! 📚✨**

Made with passion for education and interactive learning.
