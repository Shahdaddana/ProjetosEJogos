function adicionarNome() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    
    if (name !== '') {
        const namesList = document.getElementById('namesList');
        
        const nameItem = document.createElement('div');
        nameItem.classList.add('name-item');
        
        const nameText = document.createElement('span');
        nameText.textContent = name;
        
        const counterButton = document.createElement('button');
        let count = 0;
        counterButton.textContent = `Contador: ${count}`;
        counterButton.onclick = () => {
            count++;
            counterButton.textContent = `Contador: ${count}`;
        };
        
        nameItem.appendChild(nameText);
        nameItem.appendChild(counterButton);
        namesList.appendChild(nameItem);
        
        nameInput.value = '';
    }
}
