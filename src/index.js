import bindActionCreators from 'redux/lib/bindActionCreators';

export default function bindActionGroups(actionGroups, dispatch){
  if(typeof actionGroups !== 'object' || actionGroups == null){
    throw new Error('bindActionGroups expected an object, key is group name, value is object with actionCreators');
  }  

  var groupKeys = Object.keys(actionGroups);
  var groupActionCreators = {};

  for(var i = 0; i < groupKeys.length; i++){
    var key = groupKeys[i]
    var actionCreators = actionGroups[key]
    if (typeof actionCreators === 'object' && actionCreators) {
      groupActionCreators[key] = bindActionCreators(actionCreators, dispatch)
    }
  }

  return groupActionCreators;
}