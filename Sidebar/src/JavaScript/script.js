document.getElementById('open-btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar')
})

const tabs = document.querySelectorAll('.side-item')

tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)))

const tabClicked = (tab) =>{
    tabs.forEach(tab => tab.classList.remove('active'))
    tab.classList.add('active')

    const contents = document.querySelectorAll('.sidebar-content')
    contents.forEach(content => content.classList.remove('show'))  
}

const currentActiveTab = document.querySelector('.side-item.active')
tabClicked(currentActiveTab)