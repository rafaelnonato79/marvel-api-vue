import md5 from 'crypto-js/md5';

const publicKey = 'f1bb218bae8b4ce7066c3e2b1162d935';
const privateKey = '5dfa748254e651947a5f13922f8613c5ba6c8b4e';
const baseUrl = 'http://gateway.marvel.com/v1/public';

// Função para gerar o hash da autenticação
const generateHash = () => {
  const timeStamp = new Date().getTime();
  const hash = md5(timeStamp + privateKey + publicKey).toString();
  return { timeStamp, hash };
};

// Função para buscar heróis
export const fetchHeros = async (limit = 12) => {
  const { timeStamp, hash } = generateHash();

  const url = `${baseUrl}/characters?&limit=${limit}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Erro ao buscar heróis');
  }
  const data = await res.json();
  return data.data.results;
};

// Função para buscar detalhes de um herói
export const fetchHeroDetails = async (heroId) => {
  const { timeStamp, hash } = generateHash();

  const url = `${baseUrl}/characters/${heroId}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Erro ao buscar detalhes do herói');
  }
  const data = await res.json();
  return data.data.results[0];
};


//função para buscar comics pelo id
export const fetchHeroComics =async(heroId) =>{
    const { timeStamp, hash } = generateHash();
    const limit = 4;

    const url = `${baseUrl}/characters/${heroId}/comics?limit=${limit}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

    const res = await fetch(url)
    if(!res.ok){
        throw new Error('Erro ao buscar comics')
    }
    const data = await res.json();
    console.log(data.data.results)
    return data.data.results;
    
}


//função para buscar comics

export const fetchComics = async(limit=8) => {

  const {timeStamp, hash} = generateHash();

  const url = `${baseUrl}/comics?&limit=${limit}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

  const res = await fetch(url)
  if(!res.ok){
    throw new Error('Erro ao buscar comics')
  }
  const data = await res.json();
  console.log(data.data.results)
  return data.data.results;
}


//Função para buscar eventos

export const fetchEvents = async() =>{
  const { timeStamp, hash}= generateHash();

  const url = `${baseUrl}/events?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

  const res = await fetch(url)
  if(!res.ok){
    throw new Error('Erro ao buscar eventos')
  }
  const data= await res.json();
  return data.data.results;
}
