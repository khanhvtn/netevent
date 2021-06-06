import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import promise from 'redux-promise-middleware'

Enzyme.configure({
    adapter: new Adapter,
    disableLifecycleMethods: true
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('unhandledRejection', reason, promise)
})