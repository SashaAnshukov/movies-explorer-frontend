import React from 'react';
import MainStack from '../MainStack/MainStack';
import ProgressBar from '../Progressbar/Progressbar';

function AboutProject () {

    function rangeOfValues (min, value, max) {
        return Math.min(Math.max(min, value), max);
    }

    const text = {
        titleName1: 'Дипломный проект включал 5 этапов',
        titleName2: 'На выполнение диплома ушло 5 недель',
        description1: 'Составление плана, работу над бэкендом, вёрстку,добавление функциональности и финальные доработки.',
        description2: 'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.',
    }

    const data = [{ 
        completeColor: '#2BE080',
        notCompleteColor: '#F2F2F2',  
        completed: 20, 
        titleBar1: '1 неделя',
        titleBar2: '4 недели', 
        spanBar1: 'Back-end',
        spanBar2: 'Front-end'
    }];

    return (
        <MainStack stackName = {'О проекте'} id ='О_проекте'>
            <div className="AboutProject" >
                <div className="About__section">
                    <p className="AboutProject__title">{text.titleName1}</p>
                    <p className="AboutProject__description">{text.description1}</p>
                </div>
                <div className="About__section">
                    <p className="AboutProject__title">{text.titleName2}</p>
                    <p className="AboutProject__description">{text.description2}</p>
                </div>
            </div>
            <div>
                {data.map((item, id) => (
                    <ProgressBar 
                        key={id} 
                        completeColor={item.completeColor}
                        notCompleteColor={item.notCompleteColor}
                        completed={rangeOfValues(0, item.completed, 100)}
                        titleBar1={item.titleBar1}
                        titleBar2={item.titleBar2}
                        spanBar1={item.spanBar1}
                        spanBar2={item.spanBar2}
                    />
                ))}
            </div> 
        </MainStack>
    )
}

export default AboutProject;