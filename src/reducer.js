import http from './services/http'

export default (state, action) => {
    switch (action.type) {
        case "setActivePanel":
            return {
                ...state,
                activePanel: action.payload.activePanel,
                indicators: {
                    ...state.indicators,
                    ...action.payload.data
                }
            };
        case "setPopout":
            return {
                ...state,
                popout: action.payload.popout,
                error: action.payload.error
            }
        case "setUser":
            http.post('writeHandMade', {'msg':
            // Пользователь ${action.payload.fetchedUser.id}
            `. Зашел.`})
            return {
                ...state,
                fetchedUser: action.payload.fetchedUser,
                popout: action.payload.popout
            }
        case "setIndicators":
          const btn = Object.values(action.payload.data).join('.');
            http.post('writeHandMade', {'msg':
                // Пользователь ${state.fetchedUser.id}.
                    `Выбрал. ${btn}`})
            return {
                ...state,
                activePanel: action.payload.activePanel,
                indicators: {
                    ...state.indicators,
                    ...action.payload.data
                }
            }
        case "setTypes":
            return {
                ...state,
                types: action.payload.types,
                popout: action.payload.popout
            }
        case "getAllProducts":
            return {
                ...state,
                products: action.payload.products,
                popout: action.payload.popout
            }
        case "getFilteredProducts":
            return {
                ...state,
                filteredProducts: action.payload.filteredProducts,
                popout: action.payload.popout
            }
        case "setOverflow":
            return {
                ...state,
                isOverflow: action.payload.isOverflow,
                panelOverflow: action.payload.panelOverflow,
            }
        default:
            return {
                ...state,
                error: "Такого метода не существует!"
            }
    }
}
