// script for mobile menu
const burger = document.querySelector('.header__burger')
const burgerClose = document.querySelector('.mobile-menu__close')
const mobileMenu = document.querySelector('.mobile-menu')
let burgerOpen = false

function toggleMenu(e) {
    if (burgerOpen) {
            burgerOpen = false
            mobileMenu.style.display = 'none'
            mobileMenu.classList.remove('show-block')
    } else {
            burgerOpen = true
            mobileMenu.style.display = 'block'
            mobileMenu.classList.remove('hide-block')
            mobileMenu.classList.add('show-block')
    }
}  

burger.addEventListener('click', toggleMenu)
burgerClose.addEventListener('click', toggleMenu)

// script for amount button

function changeProductAmount(e) {
    if (e.target.getAttribute('class') == 'amount-btn__decrement') {
        if (productAmount > 0) {
            productAmount--
        }
    } else {
        if (productAmount < 99) {
            productAmount++
        }
    }
    productAmountText.innerText = productAmount
}

const decreementBtn = document.querySelector('.amount-btn__decrement')
const increementBtn = document.querySelector('.amount-btn__increment')
const productAmountText = document.querySelector('.amount-btn__amount')

let productAmount = 0

decreementBtn.addEventListener('click', changeProductAmount)
increementBtn.addEventListener('click', changeProductAmount)

// slider

const sliderItems = document.querySelectorAll('.slider__item')

sliderItems.forEach((item, index) => {
    item.setAttribute('data-id', index+1)
    item.style.backgroundImage = `url("/images/image-product-${index+1}.jpg")`
    item.addEventListener('click', changeSlide)
})

function changeSlide(e) {
    const sliderImg = document.querySelector('.slider__main_photo')
    const newSlideId = e.target.getAttribute('data-id')
    document.querySelector('.slider__item--active').remove('slider__item--active')
    const el = document.createElement('div')
    el.classList.add('slider__item--active')
    e.target.append(el)
    sliderImg.setAttribute('src', `/images/image-product-${newSlideId}.jpg`)
}

// slider mobile

let currentSlide = 1

function showSlide(num) {
    const sliderImg = document.querySelector('.slider__main_photo') 
    sliderImg.setAttribute('src', `/images/image-product-${num}.jpg`)
}

function decrementSlide(e) {
    if (currentSlide === 1) {
        currentSlide = 4
    } else {
        currentSlide--
    }
    showSlide(currentSlide)
}

function incrementSlide(e) {
    console.log(currentSlide)
    if (currentSlide === 4) {
        currentSlide = 1
    } else {
        currentSlide++
    }
    showSlide(currentSlide)
}

const prevSlideBtn = document.querySelector('.slider__left-button')
const nextSlideBtn = document.querySelector('.slider__right-button')

prevSlideBtn.addEventListener('click', decrementSlide)
nextSlideBtn.addEventListener('click', incrementSlide)

// cart hide-show

const cartIcon = document.querySelector('.cart')
const cart = document.querySelector('.cart__body')

let cartOpen = false

function cartShow(e) {
    cart.style.display = 'flex'
    cart.classList.remove('hide-block')
    cart.classList.add('show-block')
}

function cartHide(e) {
    if (!e.composedPath().includes(cart) && !e.composedPath().includes(cartIcon)) {
        cart.classList.remove('show-block')
        cart.classList.add('hide-block')
        setTimeout(() => {
            cart.style.display = 'none'
            cart.style.opacity = '0'
        }, 190)
    }
}


cartIcon.addEventListener('click', cartShow)
document.addEventListener('click', cartHide)


// cart content
let cartAmount = 0
const cartAmountBlock = document.querySelector('.cart__amount')
const cartContent = document.querySelector('.cart__content')

function updateCartInfo() {
    cartAmountBlock.innerText = cartAmount
    if (cartAmount === 0) {
        cartContent.classList.add('cart__content--empty')
        cartContent.classList.remove('cart__content--full')
        cartContent.innerText = 'Your cart is empty.'
    } else {
        cartContent.classList.remove('cart__content--empty')
        cartContent.classList.add('cart__content--full')
        cartContent.innerHTML = `
        <div class="cart__item">
            <img class="cart__picture" src="./images/image-product-1.jpg">
            <div class="cart__info">
            <p>Fall Limited Edition Sneakers</p>
            <p>$125.00 x ${cartAmount} <b>$${cartAmount * 125}.00</b></p>
            </div>
            <img class="cart__delete" src="./images/icon-delete.svg">
        </div>
        <div class="cart__checkout">Checkout</div>
        `
        const cartDelete = document.querySelector('.cart__delete')
        cartDelete.addEventListener('click', () => {
            cartAmount = 0
            updateCartInfo()
        })
    }
}

updateCartInfo()

const addToCartBtn = document.querySelector('.product__add_to_cart')
const chosenAmount = document.querySelector('.amount-btn__amount') 

addToCartBtn.addEventListener('click', () => {
    cartAmount += Number.parseInt(chosenAmount.innerText)
    updateCartInfo()
})


// modal-slider

let currentMobileSlide = 1

const modalSlider = document.querySelector('.modal-slider')
const sliderPhoto = document.querySelector('.slider__main_photo')
const sliderPhotoModal = document.querySelector('img.modal-slider__big-picture')
const mobileSliderClose = document.querySelector('.modal-slider__close')
const mobileSliderArrowLeft = document.querySelector('.modal-slider__arrow-left')
const mobileSliderArrowRight = document.querySelector('.modal-slider__arrow-right')

sliderPhoto.addEventListener('click', () => {
    if (window.screen.width >= 1600) {
        modalSlider.style.display = 'flex'
        modalSlider.classList.add('show-block')
    }
    })

mobileSliderClose.addEventListener('click', () => {
    modalSlider.style.display = 'none'
})

function changeActiveItem() {
    document.querySelector('.modal-slider__item--active').classList.remove('modal-slider__item--active')
    const itemsSlider = document.querySelectorAll('.modal-slider__item')
    itemsSlider.forEach((el, i) => {
        if (currentMobileSlide-1 === i) {
            console.log(el)
            el.classList.add('modal-slider__item--active')
        }
    })
}

mobileSliderArrowLeft.addEventListener('click', () => {
    if (currentMobileSlide === 1) {
        currentMobileSlide = 4
    } else {
        currentMobileSlide--
    }
    sliderPhotoModal.setAttribute('src', `./images/image-product-${currentMobileSlide}.jpg`)
    changeActiveItem()
})

mobileSliderArrowRight.addEventListener('click', () => {
    if (currentMobileSlide === 4) {
        currentMobileSlide = 1
    } else {
        currentMobileSlide++
    }
    sliderPhotoModal.setAttribute('src', `./images/image-product-${currentMobileSlide}.jpg`)
    changeActiveItem()
})