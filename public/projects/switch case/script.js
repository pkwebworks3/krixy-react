function convertText(caseType) {
  const inputText = document.getElementById('inputText').value;
  let result = '';

  switch (caseType) {
      case 'uppercase':
          result = inputText.toUpperCase();
          break;
      case 'lowercase':
          result = inputText.toLowerCase();
          break;
      case 'sentencecase':
          result = inputText
              .toLowerCase()
              .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
          break;
      case 'titlecase':
          result = inputText
              .toLowerCase()
              .replace(/\b\w/g, c => c.toUpperCase());
          break;
      case 'capitalizedcase':
          result = inputText
              .toLowerCase()
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
          break;
      case 'togglecase':
          let toggleFlag = true;
          result = inputText
              .split('')
              .map(char => {
                  if (/\w/.test(char)) {
                      const toggledChar = toggleFlag ? char.toUpperCase() : char.toLowerCase();
                      toggleFlag = !toggleFlag;
                      return toggledChar;
                  }
                  return char;
              })
              .join('');
          break;
      case 'camelcase':
          result = inputText
              .toLowerCase()
              .split(/[\s\-_]+/)
              .map((word, index) => index === 0 
                  ? word 
                  : word.charAt(0).toUpperCase() + word.slice(1))
              .join('');
          break;
      case 'pascalcase':
          result = inputText
              .toLowerCase()
              .split(/[\s\-_]+/)
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join('');
          break;
      case 'snakecase':
          result = inputText
              .toLowerCase()
              .replace(/\s+/g, '_');
          break;
      case 'kebabcase':
          result = inputText
              .toLowerCase()
              .replace(/\s+/g, '-');
          break;
      case 'alternatingcase':
          let isUpperCase = true;
          result = inputText
              .split('')
              .map(char => {
                  if (/\w/.test(char)) {
                      const toggledChar = isUpperCase ? char.toUpperCase() : char.toLowerCase();
                      isUpperCase = !isUpperCase;
                      return toggledChar;
                  }
                  return char;
              })
              .join('');
          break;
      default:
          result = inputText; // No conversion if caseType is not matched
  }

  document.getElementById('resultLabel').innerText = result;
}
let input = document.getElementById('inputText');
let result = document.getElementById('resultLabel');
function reset(){
    input.innerHTML = '';
    result.innerText = 'Result';
}


function copyToClipboard() {
    // Get the current text from the resultLabel
    const resultLabel = document.getElementById('resultLabel');
    const textToCopy = resultLabel.textContent || resultLabel.innerText;

    // Create a temporary textarea element to copy the text
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);

    // Select and copy the text
    tempTextArea.select();
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(tempTextArea);

    // Change the "Copy" button text to "Copied!" for 5 seconds
    updateCopyButtonText();
}

function updateCopyButtonText() {
    const copyButton = document.querySelector('button[onclick="copyToClipboard()"]');
    const originalText = copyButton.textContent;
    copyButton.textContent = "Copied!";
    copyButton.disabled = true; // Disable the button temporarily

    setTimeout(() => {
        copyButton.textContent = originalText;
        copyButton.disabled = false; // Re-enable the button
    }, 5000);
}