import './css/App.css';
import { useState, useEffect } from 'react'

//Elenco immagini delle carte
const cardsImage = [

  { "src": "/img/helmet-1.png", "matched": false},
  { "src": "/img/potion-1.png", "matched": false},
  { "src": "/img/ring-1.png", "matched": false},
  { "src": "/img/scroll-1.png", "matched": false},
  { "src": "/img/shield-1.png", "matched": false},
  { "src": "/img/sword-1.png", "matched": false},

]


function App() {

  //Array delle carte da gioco
  const [cards, setCards] = useState([]);

  //Array delle carte scoperte
  const [choises, setChoises] = useState([]);

  //Duplico le carte e ne creo un ordine casuale
  const duplicateCard = () =>{
    const duplicatedCard = [...cardsImage, ...cardsImage]
    .sort(() => Math.random() - 0.5)
    .map( (card, index) => ({ ...card, "id": index }));
    setCards(duplicatedCard)
  }

  //Crea le carte da gioco all'avvio
  useEffect(() => {
    duplicateCard()
  }, [])

  //Gestisce il click sulla carta
  const handleClick = (card) => {
    setChoises( currentArray => [...currentArray, card]);
  }

  //Controlla lo stato delle carte selezionate
  useEffect(() => {
    
    //Se ne ho selezionate due
    if(choises.length == 2){

      //Se le carte selzionate corrispondono
      if(choises[0].src === choises[1].src){
        
        //Inserisco il valore matched nell'array delle carte da gioco
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choises[0].src){
              return { ...card, "matched": true}
            } else {
              return card;
            }
          })
        })

        //Svuoto l'array delle carte selzionate
        setChoises([])
      } else {

        //Attendo 800ms per pemrttere di visualizzare le carte e svuoto l'array
        setTimeout( () => setChoises([]), 800)
      }
    }

  }, [choises])


  return (

    <div className="App">
      <h1>React Memory Game</h1>
      <button onClick={duplicateCard}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <div className="card" key={ card.id }>
            <div className={ (card === choises[0] || card === choises[1] || card.matched) ? "flipped" : ""}>
              <img className="front" src={card.src} alt="card front" />
              <img className="back" src="/img/cover.png" onClick={ () => handleClick( card ) } alt="cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  
  );
}

export default App;
