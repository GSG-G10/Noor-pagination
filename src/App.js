import { useState, useEffect } from 'react'
import { Card, Pagination } from 'antd';
import './App.css';
import "antd/dist/antd.css";

const { Meta } = Card;
function App() {
  const [data, setData] = useState([])
  const [numberOfPage, setNumberOfPage] = useState(0)

  useEffect(() => {

    fetch(`https://api.unsplash.com/search/collections?page=${numberOfPage}&limit=50&query=cat&client_id=kQ_rA8Dd9Tb-JZ80Nx6RyFBtaoIFyaP5kdLn5EmGkVM`)
      .then((res) => res.json())
      .then((data) => data.results)
      .then((response) => response.map((e) => ({ id: e.id, cover: e.cover_photo.urls.regular, title: e.title })))
      .then(data => setData(data))
  }, [numberOfPage]);

  return (
    <div className="App">
      <Pagination onChange={(defaultCurrent) => setNumberOfPage(defaultCurrent)} defaultCurrent={1} total={50} />
      <div className='Cards-container'>
        {data.map((ele) => <Card
          className='card-container'
          key={ele.id}
          hoverable
          style={{ width: 240 }}
          cover={<img alt={ele.title} src={ele.cover} className='image' />}
        >
          <Meta title={ele.title} />

        </Card>)}
      </div>
    </div>
  );
}

export default App;
