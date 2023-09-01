// get the categories from api
const handleData = async() =>{
    const res = await fetch(' https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const getData = data.data;
  
    displayBtn(getData);

}

// display the categories
const displayBtn =(tools) =>{
    const btnContainer = document.getElementById('containerCategories');
    tools.forEach(tool =>{
        const div = document.createElement('div');
        div.innerHTML =`
        <button onclick="indiviualTube('${tool.category_id}')" class="btn bg-[#FF1F3D] text-white hover:bg-sky-700">${tool.category}</button>
        `;

        btnContainer.appendChild(div)
    });

};

// get the indiviual categories 
const indiviualTube = async(id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json();
    let getitems = data.data;
   

    // sort
 
  const sortBtn = document.getElementById('sort');
  sortBtn.addEventListener('click', () => {
    const tube = document.getElementById('tubeContainer');
    tube.innerHTML ="";

    const sortedElement = sortItemsByViews(getitems);
      tubecategories(sortedElement);

  });

      
    tubecategories(getitems);

};

// display the categories

const tubecategories =(getitem) =>{
    const tube = document.getElementById('tubeContainer');
    tube.innerHTML ="";

    // errror show

    const displayEror = document.getElementById('errormsg');
    if(getitem.length === 0){
      displayEror.classList.remove('hidden');
    }
    else{
     displayEror.classList.add('hidden');
    
    }



//    display the item

    getitem.forEach(item =>{
        const showCat = document.createElement('div');
        // posted time
        const postedTime = item.others?.posted_date;
        let time = '';
       
          if(postedTime !== 0){ 
          const hr = Math.floor(postedTime / 3600);
          const min = Math.floor((postedTime % 3600) / 60);
          
         if (hr > 0 || min > 0) {
            time = `${hr} hr ${min} min ago`;
          }
          }

    


   showCat.innerHTML =`
        <div class="card mb-5 p-3">
                <figure><img src=${item.thumbnail} alt="Shoes"  class="w-full h-[200px]"/></figure>
                <p class="-mt-3 bg-black text-white text-end">${time}</P>
                <div class="card-body flex flex-row mb-0">
                    <img src=${item.authors[0]?.profile_picture} class="h-[40px] w-[40px] rounded-full" alt="Shoes" /> 
                 
                    <h2 class="card-title">${item.title} </h2>
                 
                  </div>
                  <div class="flex flex-row gap-3 justify-center mt-0">
                  <div>
                      <h2>${item.authors[0]?.profile_name}</h2>
                  </div>
                  ${item.authors[0]?.verified?`
                
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clip-path="url(#clip0_11_290)">
                    <path d="M19.375 10C19.375 10.8 18.3922 11.4594 18.1953 12.1969C17.9922 12.9594 18.5063 14.0219 18.1203 14.6891C17.7281 15.3672 16.5484 15.4484 15.9984 15.9984C15.4484 16.5484 15.3672 17.7281 14.6891 18.1203C14.0219 18.5063 12.9594 17.9922 12.1969 18.1953C11.4594 18.3922 10.8 19.375 10 19.375C9.2 19.375 8.54062 18.3922 7.80312 18.1953C7.04062 17.9922 5.97813 18.5063 5.31094 18.1203C4.63281 17.7281 4.55156 16.5484 4.00156 15.9984C3.45156 15.4484 2.27187 15.3672 1.87969 14.6891C1.49375 14.0219 2.00781 12.9594 1.80469 12.1969C1.60781 11.4594 0.625 10.8 0.625 10C0.625 9.2 1.60781 8.54062 1.80469 7.80312C2.00781 7.04062 1.49375 5.97813 1.87969 5.31094C2.27187 4.63281 3.45156 4.55156 4.00156 4.00156C4.55156 3.45156 4.63281 2.27187 5.31094 1.87969C5.97813 1.49375 7.04062 2.00781 7.80312 1.80469C8.54062 1.60781 9.2 0.625 10 0.625C10.8 0.625 11.4594 1.60781 12.1969 1.80469C12.9594 2.00781 14.0219 1.49375 14.6891 1.87969C15.3672 2.27187 15.4484 3.45156 15.9984 4.00156C16.5484 4.55156 17.7281 4.63281 18.1203 5.31094C18.5063 5.97813 17.9922 7.04062 18.1953 7.80312C18.3922 8.54062 19.375 9.2 19.375 10Z" fill="#2568EF"/>
                    <path d="M12.7094 7.20626L9.14065 10.775L7.29065 8.92657C6.88909 8.52501 6.23752 8.52501 5.83596 8.92657C5.4344 9.32814 5.4344 9.9797 5.83596 10.3813L8.43127 12.9766C8.8219 13.3672 9.45627 13.3672 9.8469 12.9766L14.1625 8.66095C14.5641 8.25939 14.5641 7.60782 14.1625 7.20626C13.761 6.8047 13.111 6.8047 12.7094 7.20626Z" fill="#FFFCEE"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_11_290">
                      <rect width="20" height="20" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                  ` : ''}
              </div">
                 
                
              </div>
              <p class="text-center">${item.others?.views} views</p>
        `;
        tube.appendChild(showCat);
    })
};


 // convert views to number
 const convertNumber = (views) =>{
  if(views.includes('k')){
    const convertK = parseFloat(views * 1000);
    return convertK;
  }
  else{
    const View = parseFloat(views);
    return View;
  }
}

// sorting function
const sortItemsByViews = (items) => {
  return items.sort((a, b) => {
     const totalView = convertNumber(b.others?.views) - convertNumber(a.others?.views);
    
     return totalView;
  });
};












indiviualTube('1000');

handleData();



// blog page load

const blogPage = document.getElementById('blog');
blogPage.addEventListener('click', ()=>{
  window.location.href = 'blog.html';
});