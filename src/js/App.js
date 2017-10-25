import React from 'react';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import Item from './components/Item';

import { Route, Link, Switch } from 'react-router-dom';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
    }

    state = {
        data: FAKE_DATA,
        menu: [
            {title: "Home", href: "/"},
            {title: "Add", href: "/add"},
            {title: "Item", href: "/item"},
            {title: "Item-2 custom", href: "/item-2"}
        ]
    }

    handleAddTodo(todo) {
        this.setState({ data: [ todo, ...this.state.data] })
    }

    handleComplete(index) {
        this.setState({ data: this.state.data.map((item, i) => {
            if(index === i) return { ...item, complete: !item.complete };
            return item;
        }) })
    }

    handleDelete(index) {
        this.setState({ data: this.state.data.filter((item, i) => index !== i) })
    }

    renderTodoList = () => {
        return (
            <TodoList>
                {this.state.data.map((item, i) =>
                    <TodoItem key={i} 
                        data={item}
                        index={i} 
                        complete={this.handleComplete} 
                        delete={this.handleDelete} />)}
            </TodoList>
        )
    }

    fetchData(index) {
        this.setState({ currentData: this.state.data.filter((item, i) => i === index) })
    }

    render() {
        return (
            <div className="wrapper">
                <h1>TodoApp</h1>

                {this.state.menu.map((item, i) => 
                    <Link key={i} to={item.href}>{item.title}</Link>)}

                <Switch>
                    <Route exact path="/" component={this.renderTodoList} />
                    <Route path="/add" component={() => <AddTodo addTodo={this.handleAddTodo}/>}/>
                    <Route path="/item:id" component={Item} />
                    {/* <Route render={ () => <h2>Not found!</h2> }/> */}
                </Switch>
            </div>
        )
    }
}


const FAKE_DATA = [
    {title: 'Learn React.js', descr: '1 descr for this.', completed: false},
    {title: 'Learn Router', descr: '2 descr for this.', completed: false},
    {title: 'Learn Redux', descr: '3 descr for this.', completed: false},
    {title: 'Make a little shop', descr: '4 descr for this.', completed: false},
];