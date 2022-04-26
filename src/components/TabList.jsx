import React from 'react';
import  PropTypes  from 'prop-types';
import classNames from 'classnames';


export default function TabList({ item, activeId, onTabClick, onCloseTab }) {
    return (
        <>
            {
                item.map(item => {
                    const fClassname = classNames({
                        'menu-item':true,
                        'menu-active':item.url === activeId
                    })
                    return (
                        <div key={ item.id } className={fClassname} onClick={(e) => {e.preventDefault();e.stopPropagation();onTabClick(item.url)}}>
                            {item.title}
                            <div className="menu-pop" onClick={(e) => {e.preventDefault();e.stopPropagation();onCloseTab(item.url)}}>X</div>
                        </div>
                    )
                })
            }
        </>
    )  
}

TabList.propTypes = {
    item:PropTypes.array,
    activeId:PropTypes.string,
    onTabClick:PropTypes.func,
    onCloseTab:PropTypes.func
}