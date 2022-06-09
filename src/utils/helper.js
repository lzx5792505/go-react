import React from 'react'
import * as Icon from '@ant-design/icons'
import { createBrowserHistory } from 'history'

// 跳转
const history = createBrowserHistory()

// 树形数据结构
const createTreeData = (nodes, pid) => {
    const groups = {}
    for(var i in nodes){
        if(!groups[nodes[i].pid]){
            groups[nodes[i].pid] = []
        }
        groups[nodes[i].pid].push(treeInitData(nodes[i]))

        if(pid && pid === nodes[i].id){
            pid = nodes[i].pid
        }
    }

    const rootNodes = groups[pid]
    groups[pid] = null

    function traverseTree(treeGroup){
        for(var j in treeGroup){
            const node = treeGroup[j]
            if(groups[node.id]){
                node.children = groups[node.id]
                groups[node.id] = null
                traverseTree(node.children)
            }
        }
    }

    function treeInitData(list){
        const dataList = {
            id:list['id'],
            title:list['title'],
            url:list['name'],
            pid:list['pid'] ?? 0,
            label:list['title'],
            key:list['name'],
            icon: list['icon'] ? React.createElement(Icon[list['icon']]) : ''
        }
        return dataList
    }

    traverseTree(rootNodes)
    return rootNodes
}

// 数组去重
const noRepetition = data => {
    return [ ...new Set(data.map(e=>JSON.stringify(e))) ].map( e => JSON.parse(e) )
}

// 设置本地存储
const setStorage = (key, token ) => {
    return window.localStorage.setItem(key, token)
}

// 获取本地存储
const getStorage = (key) => {
    return window.localStorage.getItem(key)
}

// 删除本地存储
const removeStorage = (key) => {
    return window.localStorage.removeItem(key)
}

export {
    history,
    setStorage,
    getStorage,
    noRepetition,
    removeStorage,
    createTreeData,
}