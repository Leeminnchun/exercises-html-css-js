import { EMPLOYEES } from './MOCK_DATA.js';
const $ = document.querySelector.bind(document);
const record = $('#record');
let perPage = record.value;
let idPage = 1;
let start = 0;
let end = perPage;
let totalPage = Math.ceil(EMPLOYEES.length / perPage);
const showSearch = $('.showSearch')
const filterSort = $('.filterSort');
const closeFilter = $('.closedSorst');
const getSearch = $('#getSearch');
const searchPerson = $('#searchPerson');
const startPage = $('.startPage');
const nextButton = $('.nextPage');
const prevButton = $('.pervPage');
const sortAToZ = $('#sortAToZ');
const sortZToA = $('#sortZToA');
const nameMember = $('#nameMember');
const emailMember = $('#emailMember');
const jobMember = $('#jobMember');
const addMember = $('#addMember');
const idMember = $('#idMember');
const modal = $('.modal');
const closeModal = $('.closeModal');
const btnOpenModal = $('#myBtn');
let totalItem = $('#totalItem');
let totalPages = $('.totalPage');

let count = 0;

function loc_xoa_dau(strings) {
    let str = strings.toString();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}


function getCurrentPage(indexPage) {
    perPage = record.value;
    start = (indexPage - 1) * perPage;
    end = indexPage * perPage;
    totalPage = Math.ceil(EMPLOYEES.length / perPage);
    startPage.innerText = end/perPage;
    totalPages.innerText = totalPage;
}

function renderPerson(person) {
    const content = person.map((item, index) => {
        const splitName = item.name.split(" ")
        const nameFirstPerson = splitName[splitName.length - 1].substr(0, 1);
        let test = splitName.length > 1 ? splitName[splitName.length - 2].substr(0, 1) + nameFirstPerson : nameFirstPerson;
        if (index >= start && index < end) {
            return `
            <div class="card__person">
                <div class="person__connect">
                    <div class="person__img">
                        <img src="#" alt="">
                        <span style="color:white">${test.toUpperCase()}</span>
                    </div>
                    <div class ="connect" style=" display: flex; margin-top: 20px;">
                        <i class="fa-solid fa-message" style="color: #4C4C4C;"></i>
                        <span>14</span>
                        <i class="fa-solid fa-users"  style="color: #4C4C4C;"></i>
                        <span>02</span>
                    </div>
                </div>
                <div class="person__info">
                    <div class="person__info__content">
                        <p>${item.name}</p>
                        <p><i class="fa-solid fa-envelope" style="color: #4C4C4C;"></i> ${item.email}</p>
                        <p><i class="fa-solid fa-briefcase" style="color: #4C4C4C;"></i> ${item.job}</p>
                    </div>
                    <button>Follow</button>
                </div>
            </div>`
        }

    });
    document.getElementById('person').innerHTML = content.join('');
}
renderPerson(EMPLOYEES)
 totalItem.innerText = EMPLOYEES.length;


 // perpage
function recordPage(arrayMember){
    record.addEventListener('change',()=>{
        idPage = 1
        getCurrentPage(idPage);
       renderPerson(EMPLOYEES);
    })
}
recordPage(EMPLOYEES)



// search
// search - person
function searchUser() {
    let getValue = getSearch.value.trim();
    let userSearch = EMPLOYEES.filter(value => {
        return (value.name.toLocaleLowerCase().includes(getValue.toLowerCase())
            || value.email && value.email.toLocaleLowerCase().includes(getValue.toLowerCase())
            || value.job.toLocaleLowerCase().includes(getValue.toLowerCase()))
    })
    return userSearch
}

searchPerson.addEventListener('click', () => {
    count = 1;
    perPage = record.value;
    const searchArray = searchUser()
    totalPage = Math.ceil(searchArray.length / perPage)
    start = 0;
    startPage.innerText = 1;
    totalPages.innerText = totalPage;
    renderPerson(searchArray);
    totalItem.innerText = searchUser().length;
})

// handle click next - prev

totalPages.innerText = totalPage;

nextButton.addEventListener('click', () => {
    idPage++;
    // perPage = record.value;
    //totalPage = Math.ceil(EMPLOYEES.length/perPage)
    prevButton.classList.remove('disabled')
    if (idPage > totalPage) {
        idPage = totalPage;
        nextButton.classList.add('disabled');
    }
    start = (idPage - 1) * perPage;
    end = idPage * perPage;
    startPage.innerText = end / perPage;
    //fromPage.innerText = end;
    switch (count) {
        case 0:
            renderPerson(EMPLOYEES);
            break;
        case 1:
            renderPerson(searchUser());
            break;
        default:
            console.log('No click when value false');
    }
})

prevButton.addEventListener('click', () => {
    idPage--;
    nextButton.classList.remove('disabled');
    if (idPage <= 0) {
        idPage = 1;
        prevButton.classList.add('disabled')
    }
    start = (idPage - 1) * perPage;
    end = idPage * perPage;
    startPage.innerText = end / perPage;
    //fromPage.innerText = end;
    switch (count) {
        case 0:
            renderPerson(EMPLOYEES);
            break;
        case 1:
            renderPerson(searchUser());
            break;
        default:
            console.log('No click when value false');
    }
})

//filter--sort--person
//handle--click
showSearch.addEventListener('click', () => {
    filterSort.style.display = 'block';
})
closeFilter.addEventListener('click', () => {
    filterSort.style.display = 'none';
})


sortAToZ.addEventListener('click', () => {
    const datas = EMPLOYEES.sort((data1, data2) => {
        let nameA = data1.name.trim().split(" ");
        let nameB = data2.name.trim().split(" ");
        const lastLengthNameA = nameA[nameA.length - 1].toLocaleLowerCase();
        const lastLengthNameB = nameB[nameB.length - 1].toLocaleLowerCase();
        if (loc_xoa_dau(lastLengthNameA).charCodeAt() < loc_xoa_dau(lastLengthNameB).charCodeAt()) {
            return -1;
        }
        else { return 1 }
    })
    renderPerson(datas)
})
sortZToA.addEventListener('click', () => {

    const datas = EMPLOYEES.sort((data1, data2) => {
        let nameA = data1.name.trim().split(" ");
        let nameB = data2.name.trim().split(" ");
        const lastLengthNameA = nameA[nameA.length - 1].toLocaleLowerCase();
        const lastLengthNameB = nameB[nameB.length - 1].toLocaleLowerCase();
        if (loc_xoa_dau(lastLengthNameA).charCodeAt() > loc_xoa_dau(lastLengthNameB).charCodeAt()) {
            return -1;
        }
        else { return 1 }
    })
    renderPerson(datas)
})

// find max id member
function maxIdMember(data) {
    const dataId = []
    const param = data.forEach(element => {
        dataId.push(element.id)

    });
    dataId.sort((a, b) => {
        return b - a
    })
    return dataId[0];
}

// add person

// check number

// dem so lan xuat hien cua 1 phan tu trong mang
function count_element_in_array(array, x) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] == x) //Tìm thấy phần tử giống x trong mảng thì cộng biến đếm
            count++;
    }
    return count;
}

btnOpenModal.onclick = function() {
    modal.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  closeModal.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

nameMember.addEventListener('change', () => {
    const getNameMember = nameMember.value;
    const arraySplitName = getNameMember.trim().split(" ");
    if (arraySplitName != '') {
        const getNameMemberFrist = arraySplitName[arraySplitName.length - 1];
        const getNameMemberSecond = arraySplitName[0];
        let connectEmail = arraySplitName.length > 1 ?
            getNameMemberFrist.replace(/[0-9]/g, '') + "." + getNameMemberSecond.replace(/[0-9]/g, '') + "@ntq-solution.com.vn" :
            getNameMemberSecond.replace(/[0-9]/g, '') + "@ntq-solution.com.vn";
        let result = loc_xoa_dau(connectEmail.toLocaleLowerCase());
        const nameDupliMail = result.split('@')[0].replace(/[0-9]/g, '');

        let getEmail = EMPLOYEES.map(data => {
            return data.email;
        })
        let getNameEmail = getEmail.map(email => email.toString().split('@')[0])
        let getNameRemoveNumber = getNameEmail.map(nameEmail => nameEmail.replace(/[0-9]/g, ''))

        let countNumDupli = count_element_in_array(getNameRemoveNumber, nameDupliMail)
        if (countNumDupli >= 1) {
            connectEmail = arraySplitName.length > 1 ?
                `${getNameMemberFrist.replace(/[0-9]/g, '')}.${getNameMemberSecond.replace(/[0-9]/g, '')}${countNumDupli + 1}@ntq-solution.com.vn` :
                `${getNameMemberSecond.replace(/[0-9]/g, '')}${countNumDupli + 1}@ntq-solution.com.vn`;
            result = loc_xoa_dau(connectEmail.toLocaleLowerCase());
            emailMember.value = result;
        }
        else {
            emailMember.value = result;
        }
    }
    else {
        alert('Name Khong duoc de dau cach');
    }

})
function containsNumber(str) {
    return /\d/.test(str);
}
function isAlphanumeric(str) {
    return /^[0-9a-zA-Z]+$/.test(str);
}
let max = maxIdMember(EMPLOYEES);
addMember.addEventListener('click', () => {
    max++;
    const getNameMember = nameMember.value;
    if (getNameMember != null && getNameMember != '' &&
        containsNumber(getNameMember) == false && isAlphanumeric(getNameMember) == true) {
        const getEmailMember = emailMember.value;
        idMember.value = max.toString();
        const getJobMember = jobMember.value;
        const newMember = {
            id: idMember.value,
            name: getNameMember,
            email: getEmailMember,
            job: getJobMember
        }
        EMPLOYEES.unshift(newMember);
        nameMember.value = '';
        emailMember.value = '';
        jobMember.value = '';
        renderPerson(EMPLOYEES);
        totalItem.innerText = EMPLOYEES.length;
    }
    else {
        nameMember.value = '';
        emailMember.value = '';
        jobMember.value = '';
        alert('Input ko de trong, ko co so va ko co ky tu dac biet')
    }

})



