const SetHelpEdit = (data) => dispatch => {
    dispatch({ type: 'SET_HELP_EDIT_FORM', input: 'id', value: data.id })
    dispatch({ type: 'SET_HELP_EDIT_FORM', input: 'help_category_id', value: data.help_category_id })
    dispatch({ type: 'SET_HELP_EDIT_FORM', input: 'photo', value: data.photo })
    dispatch({ type: 'SET_HELP_EDIT_FORM', input: 'name', value: data.name })
    dispatch({ type: 'SET_HELP_EDIT_FORM', input: 'description', value: data.description })
    dispatch({ type: 'SET_HELP_EDIT_FORM', input: 'quota', value: data.quota })
    dispatch({ type: 'SET_HELP_EDIT_FORM', input: 'end_date', value: data.end_date })

}

export default SetHelpEdit