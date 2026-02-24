const jobs = [
    {id:1, company:"Mobile First Corp", position:"React Native Developer", location:"Remote", type:"Full-time", salary: "$130,000 - $175,000", description:"Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.", status:"none"},
    {id:2, company:"WebFlow Agency", position:"Web Designer & Developer", location:"Los Angeles, CA", type:"Part-time ", salary:"$80,000 - $120,000", description:"Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.", status:"none"},
    {id:3, company:"DataViz Solutions", position:"Data Visualization Specialist", location:"Boston, MA ", type:"Full-time", salary:"$125,000 - $165,000", description:"Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.", status:"none" },
    {id:4, company:"CloudFirst Inc", position:"Backend Developer", location:"Seattle, WA", type:"Full-time", salary:"$140,000 - $190,000", description:"Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.", status:"none" },
    {id:5, company:"Innovation Labs", position:"UI/UX Engineer", location:"Austin, TX ", type:"Full-time", salary:"$110,000 - $150,000", description:"Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.", status:"none" },
    {id:6, company:"MegaCorp Solutions", position:"JavaScript Developer", location:"New York, NY ", type:"Full-time", salary:"$130,000 - $170,00", description:"Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.", status:"none" },
    {id:7, company:"StartupXYZ", position:"Full Stack Engineer", location:"Remote", type:"Full-time", salary:"$120,000 - $160,000", description:"Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.", status:"none" },
    {id:8, company:"TechCorp Industries", position:"Senior Frontend Developer", location:"San Francisco, CA ", type:"Full-time", salary:"$130,000 - $175,000", description:"We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.", status:"none" }
]

let currentTab = "all";
const container =  document.getElementById("jobContainer");
const emptyMassage = document.getElementById("emptyMassage");

function updateDashboard(){
    document.getElementById("totalCount").innerText=jobs.length;
    document.getElementById("appliedCount").innerText = jobs.filter(j=>j.status==="applied").length;
    document.getElementById("interviewCount").innerText = jobs.filter(j=>j.status==="interview").length;
    document.getElementById("rejectedCount").innerText = jobs.filter(j=>j.status==="rejected").length;
}

function getBadge(status){
    if(status ==="applied") return `<span class ="px-3 py-1 text-xs bg-blue-500 text-white rounded">APPLIED</span>`;
    if(status ==="interview") return `<span class ="px-3 py-1 text-xs bg-green-500 text-white rounded">INTERVIEW</span>`;
    if(status ==="rejected") return `<span class ="px-3 py-1 text-xs bg-red-500 text-white rounded">REJECTED</span>`;
    return `<span class ="px-3 py-1 text-xs bg-[#EEF4FF] text-black rounded">NOT APPLIED</span>`;
}

function renderJobs(){
    container.innerHTML ="";

    const filtered=jobs.filter(job=>{
        if(currentTab==="all") return true;
        return job.status===currentTab;
    });

    document.getElementById("sectionCount").innerText=filtered.length;

    if(filtered.length===0){
        emptyMassage.classList.remove("hidden");
    }
    else{
        emptyMassage.classList.add("hidden");
    }

    filtered.forEach(job=>{
        const card=document.createElement("div");
        card.className="bg-white p-6 rounded shadow relative border";

        card.innerHTML=`
            <button class="delete-btn text-[#64748B] delete-btn absolute top-4 right-4 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow-sm hover:bg-gray-100 transition duration-200"" data-id="${job.id}"><i class="fa-regular fa-trash-can"></i> </button>
            <div class="flex justify-between items-center pr-8">
                <h3 class="text-lg font-bold">${job.company}</h3>
                ${getBadge(job.status)}
            </div>
            <p class = "text-sm text-gray-600">${job.position}</p>

            <p class = "text-sm text-[#64748B]">${job.location} • ${job.type} • ${job.salary}</p>
            <p class="mt-3 text-sm text-[#64748B]">${job.description}</p>


            <div class= "flex gap-2 mt-4">
                <button class= "status-btn bg-blue-100 px-3 py-1 text-sm rounded" data-status="applied"  data-id="${job.id}">Apply</button>

                <button class= "status-btn bg-green-100 px-3 py-2 text-sm rounded" data-status="interview" data-id="${job.id}">Interview</button>

                <button class= "status-btn bg-red-100 px-3 py-2 text-sm rounded" data-status="rejected" data-id="${job.id}">Reject</button>
            </div>
        `;

        container.appendChild(card);
    });

    updateDashboard();
}


container.addEventListener("click", function(e){
    const id=parseInt(e.target.dataset.id);
    const job=jobs.find(j=>j.id===id);

    if(e.target.classList.contains("status-btn")){
        job.status=e.target.dataset.status;
    }

    if(e.target.classList.contains("delete-btn")){
        const index=jobs.findIndex(j=>j.id===id);
        jobs.splice(index,1);
    }

    renderJobs();
});

document.querySelectorAll(".tab-btn").forEach(btn=>{
    btn.addEventListener("click", function(){
        document.querySelectorAll(".tab-btn").forEach(b=>{
            b.classList.remove("bg-black", "text-white");
            b.classList.add("bg-gray-200");
        });

        this.classList.add("bg-black", "text-white");
        this.classList.remove("bg-black-200");

        currentTab=this.dataset.tab;
        renderJobs();
    });
});

renderJobs()