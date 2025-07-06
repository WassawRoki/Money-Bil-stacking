# Money Stack Visualizer

A JavaScript function that creates 3D money stack visualizations showing dollar amounts as growing cube structures.

I jhave included a simple visualiser, in the form of a html file where the function can be tested:

![image](https://github.com/user-attachments/assets/734bc13d-030d-4a79-a9c5-a3f93ac90916)
![image](https://github.com/user-attachments/assets/88ddf01b-7732-43b7-81f8-2bb34b8ea49f)
It will stack bills in an ordering from left to right top to buttom in order to create square stacks

## Usage

### 1. Include the script
```html
<script src="money-stack-visualizer.js"></script>
```

### 2. Create a visualization
```javascript
const stackElement = createMoneyStackVisualization(25000, {
    width: 200,
    height: 200
});
document.getElementById('container').appendChild(stackElement);
```

## Function Parameters

### `createMoneyStackVisualization(amount, options)`

**amount** (number): Dollar amount to visualize

**options** (object, optional):
- `width` (default: 200) - Container width in pixels  
- `height` (default: 200) - Container height in pixels
- `imageSrc` (default: 'moneystack.png') - Path to money stack image
- `backgroundColor` (default: gradient) - Container background
- `borderRadius` (default: '15px') - Container border radius
- `border` (default: '3px solid #dee2e6') - Container border

## Examples

### Basic usage
```javascript
const myStack = createMoneyStackVisualization(15000);
document.body.appendChild(myStack);
```

### Custom styling
```javascript
const customStack = createMoneyStackVisualization(50000, {
    width: 300,
    height: 300,
    backgroundColor: 'transparent',
    border: 'none'
});
```

## How it works

- Each bundle represents $1,000
- Builds progressive cubes: 1x1x1 → 2x2x2 → 3x3x3 → ... → 10x10x10
- $1,000 = 1x1x1 cube (1 stack)
- $8,000 = 2x2x2 cube (8 stacks)  
- $27,000 = 3x3x3 cube (27 stacks)
- $1,000,000 = 10x10x10 cube (1,000 stacks)

The function automatically scales the visualization to fit within the specified container size. 
