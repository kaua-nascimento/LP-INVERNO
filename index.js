function createCard(title = "Inverno São Paulo", date = "22/06/2025", buttonText = "INSCREVA-SE", isActive = true, link) {
  try {
    // Criar elementos
    const cardElement = document.createElement("div");
    const divCardImg = document.createElement("div");
    const divDataCard = document.createElement("div");
    const divBtnCard = document.createElement("div");
    
    // Adicionar classes baseadas no estado do card
    cardElement.classList.add(isActive ? "card" : "card-off");
    divCardImg.classList.add("img-card");
    divDataCard.classList.add("data-card");
    divBtnCard.classList.add("btn-card");
    
    // Criar elementos internos
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const button = document.createElement('button');
    
    // Configurar elementos
    h3.textContent = title;
    p.textContent = date;
    button.textContent = buttonText;
    
    if (isActive) {
      button.classList.add("btn-subscribe");
      button.addEventListener('click', () => {
        window.open(link, '_blank');
      });
    } else{
        button.addEventListener('click', () => {
        window.open("https://www.runningland.com.br/calendario?page=1", '_blank');
      });
    }
    
    // Montar a estrutura
    divDataCard.appendChild(h3);
    divDataCard.appendChild(p);
    divBtnCard.appendChild(button);
    
    cardElement.appendChild(divCardImg);
    cardElement.appendChild(divDataCard);
    cardElement.appendChild(divBtnCard);
    
    // Adicionar ao DOM
    const containerMain = document.querySelector('.card-main');
    if (containerMain) {
      containerMain.appendChild(cardElement);
    } else {
      console.error("Container .card-main não encontrado");
    }
    
    return cardElement;
    
  } catch (error) {
    console.error("Erro ao criar card:", error);
    return null;
  }
}

function createMultipleCards(cardsData) {
  cardsData.forEach(cardData => {
    createCard(
      cardData.title,
      cardData.date,
      cardData.buttonText || "INSCREVA-SE",
      cardData.isActive !== false,
      cardData.link || "https://www.runningland.com.br/calendario?page=1"
    );
  });
}

function updateCardStatusByDate(cardsData) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return cardsData.map(cardData => {
    try {
      const dateParts = cardData.date.split('/');
      const cardDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      cardDate.setHours(0, 0, 0, 0);
      
      const hasExpired = cardDate < today;
      console.log(hasExpired);
      
      return {
        ...cardData,
        isActive: !hasExpired,
        buttonText: hasExpired ? "CALENDÁRIO" : (cardData.buttonText || "INSCREVA-SE")
      };
      
    } catch (error) {
      console.error(`Erro ao processar data do card "${cardData.title}":`, error);
      return { ...cardData, isActive: false };
    }
  });
}

function createCardsWithDateValidation(cardsData) {
  const updatedCardsData = updateCardStatusByDate(cardsData);
  createMultipleCards(updatedCardsData);
}

// Dados dos cards
const cardsToCreate = [
  {
    title: "Inverno São Paulo",
    date: "22/06/2025",
    buttonText: "INSCREVA-SE",
    isActive: true,
    link: "https://www.runningland.com.br/calendario?page=1",
  },
  {
    title: "Inverno Rio de Janeiro",
    date: "15/07/2025",
    isActive: false,
    link: "https://www.runningland.com.br/calendario?page=1",
    buttonText: "INSCREVA-SE"

  },
  {
    title: "Inverno Brasília",
    date: "01/08/2025",
    isActive: true,
    link:"https://runningland.com.br/circuito-das-estacoes-2025-inverno-brasilia",
    buttonText: "INSCREVA-SE"

  },
  {
    title: "Inverno Belo Horizonte",
    date: "15/03/2025",
    isActive: true,
    link:"https://runningland.com.br/circuito-das-estacoes-2025-inverno-belo-horizonte",
    buttonText: "INSCREVA-SE"

  },
  {
    title: "Inverno Curitiba",
    date: "30/07/2025",
    isActive: true,
    link:"https://runningland.com.br/circuito-das-estacoes-2025-inverno-curitiba",
    buttonText: "INSCREVA-SE"
  },
  {
    title: "Inverno Porto Alegre",
    date: "22/07/2025",
    isActive: true,
    link: "https://www.runningland.com.br/circuito-das-estacoes-2025-inverno-poa",
    buttonText: "INSCREVA-SE"
  }
];

// Criar cards com validação de data
createCardsWithDateValidation(cardsToCreate);