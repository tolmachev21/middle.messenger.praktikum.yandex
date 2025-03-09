import Block from './Block.ts'

export default function renderDOM (block: Block) {
    const root = document.getElementById('app')
    if (!root) {
        throw new Error('Root element not found')
    }
    root.innerHTML = ''
    root.appendChild(block.getContent())
}

export function render (query: any, block: Block) {
    const root = document.querySelector(query)

    root.appendChild(block.getContent())

    block.dispatchComponentDidMount()

    return root
}