import matplotlib.pyplot as plt
import numpy as np

# Dados da escala Likert
data = np.array([
    [1,0,2,3,3],
    [0,0,0,2,7],
    [0,1,1,3,4],
    [2,1,1,4,1],
    [0,0,0,2,7],
    [0,0,0,1,8],
    [0,0,2,3,4],
    [0,0,0,1,8],
    [0,0,0,2,7],
    [1,2,1,3,2],
    [2,0,2,4,1],
    [1,2,1,3,2]
])

labels = [f'Q{i+1}' for i in range(data.shape[0])]
y = np.arange(len(labels))

plt.figure(figsize=(12,7))

for i, row in enumerate(data):
    dt, d, n, c, ct = row
    total = row.sum()

    # Neutro centralizado
    if n > 0:
        plt.barh(y[i], n, color='#cccccc', left=-n/2)
        plt.text(0, y[i], f'{n/total*100:.0f}%', 
                 ha='center', va='center', color='black', fontsize=9)

    # Barras negativas (à esquerda do neutro)
    neg_values = [(dt, '#e63636'), (d, '#e66c37')]
    neg_cum = -n/2
    for val, color in neg_values:
        if val > 0:
            plt.barh(y[i], -val, color=color, left=neg_cum)
            plt.text(neg_cum - val/2, y[i], f'{val/total*100:.0f}%', 
                     ha='center', va='center', color='white', fontsize=9)
            neg_cum -= val

    # Barras positivas (à direita do neutro)
    pos_values = [(c, '#8fbc8f'), (ct, '#008000')]
    pos_cum = n/2
    for val, color in pos_values:
        if val > 0:
            plt.barh(y[i], val, color=color, left=pos_cum)
            plt.text(pos_cum + val/2, y[i], f'{val/total*100:.0f}%', 
                     ha='center', va='center', color='white', fontsize=9)
            pos_cum += val

plt.yticks(y, labels)
plt.gca().invert_yaxis()
plt.axvline(0, color='black', linewidth=0.8)
plt.xlabel('Número de respostas')
plt.title('Gráfico de barras divergentes - Escala Likert centrada no Neutro')

# Legenda
plt.bar(0,0,color='#e63636', label='Discordo totalmente')
plt.bar(0,0,color='#e66c37', label='Discordo')
plt.bar(0,0,color='#cccccc', label='Neutro')
plt.bar(0,0,color='#8fbc8f', label='Concordo')
plt.bar(0,0,color='#008000', label='Concordo totalmente')
plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')

plt.tight_layout()
plt.show()
