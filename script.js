// ===== REPORT PAGE =====
const form = document.getElementById("reportForm");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const location = document.getElementById("location").value;
        const description = document.getElementById("description").value;
        const fine = document.getElementById("fine").value;
        const photoInput = document.getElementById("photoUpload");

        let reader = new FileReader();

        reader.onload = function() {
            const photo = reader.result;

            const complaint = {
                name: name,
                location: location,
                description: description,
                fine: fine,
                photo: photo
            };

            let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
            complaints.push(complaint);
            localStorage.setItem("complaints", JSON.stringify(complaints));

            alert("Complaint Submitted Successfully!");
            form.reset();
        };

        if (photoInput.files[0]) {
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            reader.onload();
        }
    });
}


// ===== VIEW PAGE =====
const complaintList = document.getElementById("complaintList");

if (complaintList) {
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaintList.innerHTML = "";

    complaints.forEach((complaint, index) => {

        const div = document.createElement("div");

        div.innerHTML = `
            <h3>Complaint ${index + 1}</h3>
            <p><b>Name:</b> ${complaint.name}</p>
            <p><b>Location:</b> ${complaint.location}</p>
            <p><b>Description:</b> ${complaint.description}</p>
            <p><b>Fine:</b> ₹ ${complaint.fine}</p>
            ${complaint.photo ? `<img src="${complaint.photo}" width="200"><br>` : ""}
            <button onclick="deleteComplaint(${index})">Delete</button>
        `;

        complaintList.appendChild(div);
    });
}


// ===== DELETE FUNCTION =====
function deleteComplaint(index) {
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    complaints.splice(index, 1);
    localStorage.setItem("complaints", JSON.stringify(complaints));
    location.reload();
}