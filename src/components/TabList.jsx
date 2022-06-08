import React from 'react';
import  PropTypes  from 'prop-types';
import classNames from 'classnames';
import { noRepetition } from '@/utils'
import { CloseCircleOutlined  } from '@ant-design/icons'

export default function TabList({ item, activeId, onTabClick, onCloseTab }) {
    return (
        <>
            {
                noRepetition(item).map(item => {
                    const fClassname = classNames({
                        'menu-item':true,
                        'menu-active':item.url === activeId
                    })
                    return (
                        <div key={ item.id } className={fClassname} onClick={(e) => {e.preventDefault();e.stopPropagation();onTabClick(item.url)}}>
                            {item.title}
                            <div className="menu-pop close-icon" onClick={(e) => {e.preventDefault();e.stopPropagation();onCloseTab(item.url)}}>
                                <CloseCircleOutlined  />
                            </div>
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