import './App.css'
import {useEffect, useState} from "react";
import {IntensityChoice} from "./entities/intensityChoice.jsx";
const intensitiesList = [{name: "Минимальная",
    description: "Сидячая работа и нет физических нагрузок"}, {name: "Низкая",
    description: "Редкие, нерегулярные тренировки, активность в быту"}, {name: "Средняя",
    description: "Тренировки 3-5 раз в неделю"},{name: "Высокая",
    description: "Тренировки 6-7 раз в неделю"}, {name: "Очень высокая",
    description: "Больше 6 тренировок в неделю и физическая работа"}]
const intensitiesMeaning = {"Минимальная":1.2, "Низкая":1.375, "Средняя":1.55, "Высокая":1.725, "Очень высокая":1.9}
function App() {
    const [gender, setGender] = useState("male")
    const [chosenIntensity, setChosenIntensity] = useState("Минимальная")
    const [deleteButtonIsDisabled, setDeleteButtonIsDisabled] = useState(true);
    const [resultButtonIsDisabled, setResultButtonIsDisabled] = useState(true)
    const [age, setAge] = useState(null);
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [loosingWeight, setLoosingWeight] = useState(null)
    const [maintainingWeight, setMaintainingWeight] = useState(null)
    const [gainingWeight, setGainingWeight] = useState(null)
    useEffect(() => {
        if(age||height||weight){
            setDeleteButtonIsDisabled(false);
        }
        else {setDeleteButtonIsDisabled(true)}
    }, [age,height,weight]);
    useEffect(() => {
        if(age&&height&&weight){
            setResultButtonIsDisabled(false);
        }
        else {setResultButtonIsDisabled(true)}
    }, [age,height,weight]);
    function countResult(){
        let result= 0
        if(gender==="female"){
            result = ((10*weight)+(6.25*height)-(5*age)-161)*intensitiesMeaning[chosenIntensity]
        }
        if(gender==="male"){
            result=((10*weight)+(6.25*height)-(5*age)+5)*intensitiesMeaning[chosenIntensity]
        }
        setMaintainingWeight(result);
        setLoosingWeight(result*0.85);
        setGainingWeight(result*1.15)
    }
    return (
        <div className="page">
            <div className="main">
                <div className="container">
                    <article className="counter">
                        <h1 className="counter__heading heading-main">
                            Счётчик калорий
                        </h1>
                        <div className="counter__form form" name="counter" action="#" method="post">
                            <div className="form__item">
                                <h2 className="heading">
                                    Пол
                                </h2>
                                <ul className="switcher">
                                    <li className="switcher__item">
                                        <input name="gender" type="radio" checked={gender==="male"} required />
                                            <label onClick={()=>{setGender("male")}}>
                                                Мужчина
                                            </label>
                                    </li>
                                    <li className="switcher__item">
                                        <input name="gender" type="radio" checked={gender==="female"} required />
                                            <label onClick={()=>{setGender("female")}}>
                                                Женщина
                                            </label>
                                    </li>
                                </ul>
                            </div>
                            <div className="form__item form__parameters">
                                <legend className="visually-hidden">
                                    Физические параметры
                                </legend>
                                <div className="inputs-group">
                                    <div className="input">
                                        <div className="input__heading">
                                            <div className="heading">
                                                Возраст
                                            </div>
                                            <span className="input__heading-unit">
                    лет
                  </span>
                                        </div>
                                        <div className="input__wrapper">
                                            <input type="text" id="age" name="age" placeholder="0" value={age || ""} inputMode="decimal" maxLength="3" required onChange={(e)=>{setAge(e.target.value); setDeleteButtonIsDisabled(false)}}/>
                                        </div>
                                    </div>
                                    <div className="input">
                                        <div className="input__heading">
                                            <div className="heading">
                                                Рост
                                            </div>
                                            <span className="input__heading-unit">
                    см
                  </span>
                                        </div>
                                        <div className="input__wrapper">
                                            <input value={height || ""}  placeholder="0" inputMode="decimal" maxLength="3" onChange={(e)=>{setHeight(e.target.value)}} required />
                                        </div>
                                    </div>
                                    <div className="input">
                                        <div className="input__heading">
                                            <div className="heading">
                                                Вес
                                            </div>
                                            <span className="input__heading-unit">
                    кг
                  </span>
                                        </div>
                                        <div className="input__wrapper">
                                            <input type="text" id="weight" name="weight" value={weight || ""} placeholder="0" inputMode="decimal" maxLength="3" onChange={(e)=>{setWeight(e.target.value)}} required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form__item">
                                <div className="heading">
                                    Физическая активность
                                </div>
                                {intensitiesList.map((element, index)=>
                                    (<IntensityChoice key={element.name} name={element.name} description={element.description}
                                                          chosenIntensity={chosenIntensity} setChosenIntensity={setChosenIntensity}/>)
                                )}
                            </div>
                            <div className="form__submit">
                                <button className="form__submit-button button" name="submit" onClick={countResult} disabled={resultButtonIsDisabled} type="submit" >
                                    Рассчитать
                                </button>
                                <button className="form__reset-button" name="reset" onClick={()=>{setWeight(null);console.log(height);setHeight(null);setAge(null)}} disabled={deleteButtonIsDisabled}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#FD3636" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z"/>
                                    </svg>
                                    <span>
                                        Очистить поля и расчёт
                                      </span>
                                </button>
                            </div>
                        </div>
                        <section className={`counter__result ${!maintainingWeight && "counter__result--hidden"}`}>
                            <h2 className="heading">
                                Ваша норма калорий
                            </h2>
                            <ul className="counter__result-list">
                                <li className="counter__result-item">
                                    <h3>
                                        <span id="calories-norm">{maintainingWeight}</span> ккал
                                    </h3>
                                    <p>
                                        поддержание веса
                                    </p>
                                </li>
                                <li className="counter__result-item">
                                    <h3>
                                        <span id="calories-minimal">{loosingWeight}</span> ккал
                                    </h3>
                                    <p>
                                        снижение веса
                                    </p>
                                </li>
                                <li className="counter__result-item">
                                    <h3>
                                        <span id="calories-maximal">{gainingWeight}</span> ккал
                                    </h3>
                                    <p>
                                        набор веса
                                    </p>
                                </li>
                            </ul>
                        </section>
                    </article>
                </div>
            </div>
        </div>)}

export default App;