import reducer, { initialState, nextRound, addPlayer, previousRound, changePointSelected, givePointsToPlayer, newGame } from '../store/reducer';

test("state initialized", () => {
    expect(reducer(undefined, { type: "dummy_action"})).toEqual(initialState);
});

test("players added to state", () => {
    let state;
    state = reducer({players:[],round:0,pointSelected:0}, {type:addPlayer.type,payload:'Jack'});
    expect(state).toEqual({players:[{name:'Jack',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0}],round:0,pointSelected:0});

    state = reducer({players:[{name:'Jack',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0}],round:0,pointSelected:0}, {type:addPlayer.type,payload:'Jill'});
    expect(state).toEqual({players:[{name:'Jack',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0},{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0}],round:0,pointSelected:0});
});

test("round goes to next and back to previous", () => {
    let state;
    state = reducer({players:[{name:'Jack',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0},{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0}],round:0,pointSelected:0}, {type:nextRound.type});

    expect(state).toEqual({players:[{name:'Jack',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0},{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0}],round:1,pointSelected:0});

    reducer({players:[{name:'Jack',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0},{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0}],round:2,pointSelected:0}, {type:previousRound.type});
    expect(state).toEqual({players:[{name:'Jack',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0},{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0}],round:1,pointSelected:0});
});

test("point is selected", () => {
    let state;
    state = reducer({players:[{name:'Jack',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0},{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0}],round:1,pointSelected:0}, {type:changePointSelected.type,payload:600});
    expect(state).toEqual({players:[{name:'Jack',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0},{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0}],round:1,pointSelected:600});
});

test("points are given to player", () => {
    let state;
    state = reducer({players:[{name:'Jack',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0},{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0}],round:1,pointSelected:600}, {type:givePointsToPlayer.type,payload:{player:{name:'Jack',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0},points:600}});
    expect(state).toEqual({players:[{name:'Jack',points:[{'200':0,'400':0,'600':1,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:600},{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0}],round:1,pointSelected:0});

    state = reducer({players:[{name:'Jack',points:[{'200':0,'400':0,'600':1,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:600},{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0}],round:1,pointSelected:1000}, {type:givePointsToPlayer.type,payload:{player:{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:0},points:1000}});
    expect(state).toEqual({players:[{name:'Jack',points:[{'200':0,'400':0,'600':1,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:600},{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':1},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:1000}],round:1,pointSelected:0});
});

test("points are removed from player", () => {
    let state;
    state = reducer({players:[{name:'Jack',points:[{'200':0,'400':0,'600':1,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:600},{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':1},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:1000}],round:1,pointSelected:200}, {type:givePointsToPlayer.type,payload:{player:{name:'Jill',points:[{'200':0,'400':0,'600':0,'800':0,'1000':1},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:1000},points:-200}});
    expect(state).toEqual({players:[{name:'Jack',points:[{'200':0,'400':0,'600':1,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:600},{name:'Jill',points:[{'200':-1,'400':0,'600':0,'800':0,'1000':1},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:800}],round:1,pointSelected:0});
});

test("state resets on new game", () => {
    let state;
    state = reducer({players:[{name:'Jack',points:[{'200':0,'400':0,'600':1,'800':0,'1000':0},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:600},{name:'Jill',points:[{'200':-1,'400':0,'600':0,'800':0,'1000':1},{'400':0,'800':0,'1200':0,'1600':0,'2000':0},{'5000':0}],score:800}],round:4,pointSelected:0}, {type:newGame.type});
    expect(state).toEqual({players:[],round:0,pointSelected:0});
});