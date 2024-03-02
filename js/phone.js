const loadData=async(searchText='13',isShowALL)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data=await res.json();
    const phones=data.data;
    displayPhones(phones,isShowALL);
}
const displayPhones=(phones,isShowALL)=>{
    const PhoneContainer=document.getElementById('phone-container');
    PhoneContainer.textContent='';
    //display showAll btn if phone length >10 and remove hidden class
    const hiddenBtn=document.getElementById('show-all-container');
    if(phones.length>10 && 
        !isShowALL)
    {
        hiddenBtn.classList.remove('hidden');
    }
    else
    {
        hiddenBtn.classList.add('hidden');
    }
    //display first 10 phones
    // console.log('is Show All',isShowALL);
    if(!isShowALL)
    {
        phones=phones.slice(0,12);
    }
    phones.forEach(phone=>{
        // console.log(phone);
        const phoneCard=document.createElement('div');
        phoneCard.classList=`card bg-base-100 p-4 shadow-xl`;
        phoneCard.innerHTML=`
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
            <h2 class="card-title text-center items-center justify-center">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <h4 class="font-bold text-center items-center justify-center">$999<h4>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        ` 
        PhoneContainer.appendChild(phoneCard)
    })
    toggleLoadingSpinner(false);
}
//handleSearch
const handleSearch=(isShowALL)=>{
    toggleLoadingSpinner(true)
    const searchField=document.getElementById('search-field');
    const searchFieldText=searchField.value;
    loadData(searchFieldText,isShowALL);
}

//handle search2
/* const handleSearch2=()=>{
    toggleLoadingSpinner(true);
    const handleSearch2=document.getElementById('search-field2');
    const searchText=handleSearch2.value;
    loadData(searchText);
} */
//loading spinner
const toggleLoadingSpinner=(isLoading)=>
{
    const LoadingSpinner=document.getElementById('loading-spinner');
    if(isLoading)
    {
        LoadingSpinner.classList.remove('hidden');
    }
    else
    {
        LoadingSpinner.classList.add('hidden');
    }
}
//showDetails
const handleShowDetails=async(id)=>{
    //load data
    const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data=await res.json();
    // console.log(data);
    const phone=data.data;
    showModalDetails(phone);
}
//show modals
const showModalDetails=(phone)=>
{
    console.log(phone);
    const showDetailsPhone=document.getElementById('show-details-container');
    showDetailsPhone.innerHTML=`
        <div class="bg-[#0D6EFD0D] text-center flex items-center justify-center min-w-full"><img src="${phone.image}"></div>
        <h3 id="showPhoneName" class="font-bold text-2xl">${phone.name}</h3>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p><span class="font-bold">Storage:</span> ${phone.mainFeatures.storage}</p>
        <p><span class="font-bold">Display Size:</span> ${phone.mainFeatures.displaySize}</p>
        <p><span class="font-bold">ChipSet:</span> ${phone.mainFeatures.chipSet}</p>
        <p><span class="font-bold">Memory:</span> ${phone.mainFeatures.memory}</p>
        <p><span class="font-bold">Slug:</span> ${phone.slug}</p>
        <p><span class="font-bold">releaseDate:</span> ${phone.releaseDate}</p>
        <p><span class="font-bold">Brand:</span> ${phone.brand}</p>
        <p><span class="font-bold">GPS:</span> ${phone.others.GPS}</p>

    `
    show_details_modal.showModal();
}
//handleShowAll
const handLEShowALL=()=>{
    handleSearch(true);
}
loadData();