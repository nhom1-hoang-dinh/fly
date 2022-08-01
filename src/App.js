import maybay from './maybay.svg';
import help from './help.svg';
import { useEffect, useState } from 'react';
import './App.css';
function App() {
  const[arrText, setArrText] = useState(('bắt đầu chiếc áo sơ mi là khuynh đảo mạng xã hội Nhật Bản với thiết kế vô cùng độc đáo nhận được nhiều sự quan tâm từ cư dân mạng Việt Nhật Chiếc áo khiến người mặc sẽ còn phải sợ hãi với việc mồ hôi thấm qua khu vực nách áo nữa vì nhà sản xuất đã cắt bỏ luôn phần này chiếc áo có tên được một công ty tại nhật bản phát triển với hình dáng vô cùng độc lạ tạo cảm giác thoáng mát sau khi những hình ảnh đầu tiên của chiếc áo được đăng tải nhiều cư dân mạng Nhật cho rằng những mẫu quần áo tương tự nhưng dành cho các chị em đã được bày bán từ rất lâu trước đó nếu ở nhật bản cũng không khó để bắt gặp những chiếc áo tương tự như thế này câu chuyện về chiếc áo độc lạ này vẫn đang nhận được nhiều sự quan tâm từ cộng đồng mạng không chỉ ở nhật bản mà tại việt nam nhiều cộng đồng mạng cũng bày tỏ ý kiến hưởng ứng sản phẩm này như trông nhức nách thật đấy Xem có muốn tặng ai mua hộ cho chuyên để họp trong tiết trời').split(' '));
  const [list, setList] = useState([
    {text : arrText[0], bottom :100, left : 10, die : false, position: 0, type: 1},
    {text : arrText[1], bottom : 100, left : 40 , die : false, position: 1, type: 0}
  ]);
  const [action, setAction] = useState(0);
  const [text, setText] = useState('');
  const [point, setPoint] = useState(0);
  const [loadPage, setLoadPage] = useState(true);
  const [level, setLevel] = useState(1);
  const [helpAction, setHelpAction] = useState(true);

  useEffect(() => {
    function tick() {
      if(action == 0){
        return;
      }
      if((list.filter(val => val.bottom <= 30 && val.die == false)).length > 0){
        setAction(0);
        setList([]);
        setLevel(0);
        return;
      }
     const arrList = [];
     list.forEach((value) => {
      if(value.die){
        arrList.push(value);
        return;
      }
      arrList.push({ text: value.text, 
        bottom: value.bottom - 10, 
        left: value.bottom <= 40 ? 48 : Math.floor(Math.random() * 90),
        die: value.die,
        type: value.type,
        position: value.position
      });
     })
     for(var i = 0 ; i < level; i++){
      arrList.push({ text: arrText[Math.floor(Math.random() * (arrText.length - 1))], 
        bottom: 100,
        left: Math.floor(Math.random() * 100),
        die : false,
        type: Math.floor(Math.random() * 11),
        position: list.length + i
      });
     }
     setList(arrList);
    }
    if(action === 1){
      setLoadPage(false);
      setAction(2);
      tick();
    }
    let id = setInterval(tick, 5000);
    return () => clearInterval(id);
  }, [list, action]);
  
  function changeStatusRocket(){
    const arrList = [];
     list.forEach((value) => {
      if(value.die){
        arrList.push(value);
        return;
      }
      arrList.push({ text: value.text, 
        bottom: value.bottom, 
        left: value.left,
        die: true
      });
     })
     setList(arrList);
  }
  function checkText($text){
    if($text == '' || $text == ''){
      return;
    }
    let addPoint = 0;
    const ArrTextList = list;
    if(list.filter(val => (val.text == $text && val.die == false && val.bottom < 100 && val.type == 1)).length > 0){
      list.filter(val => (val.die == false && val.bottom < 100)).forEach((value)=> {
        ArrTextList[value.position].die = true;
        addPoint = addPoint +1;
      })
    }else{

      list.filter(val => (val.text == $text && val.die == false && val.bottom < 100)).forEach((value)=> {
        ArrTextList[value.position].die = true;
        addPoint = addPoint +1;
      })
    }
    if(point + addPoint < 5){
      setLevel(1);
    }else if(point + addPoint < 10){
      setLevel(2);
    }else if(point + addPoint < 20){
      setLevel(3);
    }else if(point + addPoint < 40){
      setLevel(4);
    }else if(point + addPoint < 60){
      setLevel(5);
    }else if(point + addPoint < 80){
      setLevel(6);
    }else if(point + addPoint < 100){
      setLevel(7);
    }else if(point + addPoint < 140){
      setLevel(8);
    }else if(point + addPoint < 180){
      setLevel(9);
    }else if(point + addPoint < 260){
      setLevel(10);
    }else if(point + addPoint < 360){
      setLevel(11);
    }else if(point + addPoint < 490){
      setLevel(12);
    }
    setPoint(point + addPoint);
    setList(ArrTextList);
  }
  function beginTest(){
    setList([
      {text : arrText[0], bottom :100, left : 10, die : false, position: 0, type: 1},
      {text : arrText[1], bottom : 100, left : 40 , die : false, position: 1, type: 0}
    ]);
    setAction(1);
    setPoint(0);
    setLevel(1);
  }
  function changeTextAction(event){
    if((event.target.value).indexOf(' ') >= 0){
      checkText(text);
      setText('');
    }else{
      setText(event.target.value);
    }
  }
  return (
    <div className="App">
      <header className="App-header"> FLY </header>
      <div className='sky'>
        <div className='lane'></div>
        <div className='car'>
          <img src={maybay} className="maybay" alt="logo" onClick={changeStatusRocket}/>
        </div>
      </div>
      <div className="listText">
      {
        list.map((value, key)=>(
          <li key={key} style={{'bottom': value.bottom + '%', 'left': value.left + '%'}} className={value.die && value.type == 1? ' die icon-boom': value.die ? 'die' : value.type == 1 ? 'icon-boom' : ''}>
            <div className='text'>{value.text}</div>
            <div className='boom'><div className="dot" style={{'bottom': value.die ? value.bottom + '%' : '20%', 'left': value.die ? value.left + '%' : '49.5%'}}></div></div>
            </li>
        ))
      }
      </div>
      {
        action == 0 
        ? <>
            <div className="form-begin">
              {
                loadPage == false 
                ? <>
                    <h1 className='f-paci text-warning'>Thành tích</h1>
                    <h1 className='f-paci text-warning'>{point} điểm</h1>
                  </>
                : <>
                    <h1 className='f-paci text-warning'>Fly!</h1>
                  </>
              }
                <button className='btn' onClick={beginTest}>Play!</button>
            </div>
        </>
        :<>
          <div className="form-begin">
            <div className="beginning">
              {
                point == 0
                ? <>
                  <p>
                    <button className='btn' style={{'background': '#fff','margin':'0 3px'}}>b</button>
                    <button className='btn' style={{'background': '#fff','margin':'0 3px'}}>ắ</button>
                    <button className='btn' style={{'background': '#fff','margin':'0 3px'}}>t</button>
                    <button className='btn' style={{'background': '#fff','margin':'0 3px'}}>sapce</button>
                  </p>
                </>
                : <p className='f-paci text-warning'>{point}</p>
              }
              <input type="text" autoComplete='off' className="inputtext" placeholder='Gỏ ở đây...' id="inputtext" value={text} autoFocus onChange={changeTextAction}/>
            </div>
              </div>
            </>
      }
      {
        helpAction == true 
        ? <div className='form-help'>
              <img src={help} />
              <p>
              <button className='btn' onClick={()=>{setHelpAction(false)}}>Đã hiểu</button>
              </p>
        </div>
        :''
      }
    </div>
  );
}

export default App;
