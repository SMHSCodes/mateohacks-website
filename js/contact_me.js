var form = document.getElementById("my-form");
var inputs = document.getElementsByClassName("form-control");

function isEmpty(str) {
    return !str.trim().length; //thanks roko :)
}

async function handleSubmit(event) {
    var data = new FormData(event.target);
    let ver = true;
    event.preventDefault();
    //console.log("start of loop");
    for(i = 0; i < inputs.length; i++) {
        if(isEmpty(inputs[i].value)) {
            ver = false;
        }
    }
    //console.log("sucessful loop");
    if(!ver) {
        //console.log("did not submit");
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
        $('#success > .alert-danger').append("<strong> You must fill out all parts of the form to submit it.</strong>");
        $('#success > .alert-danger').append('</div>');
    }
    else {
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // status.innerHTML = "Thanks for your submission!";
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-success')
                    .append("<strong>Your message has been sent. </strong>");
                $('#success > .alert-success')
                    .append('</div>');
                    form.reset()
            } else {
                response.json().then(data => {
                    /*   if (Object.hasOwn(data, 'errors')) {
                          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                      } else { */
                    // status.innerHTML = "Oops! There was a problem submitting your form"
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong> Please provide a legitimate email address. </strong>");
                    $('#success > .alert-danger').append('</div>');
                    //}
                })
            }
        }).catch(error => {
            // status.innerHTML = "Oops! There was a problem submitting your form"
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-danger').append("<strong>Sorry, it seems that my mail server is not responding. Please try again later! </strong>");
            $('#success > .alert-danger').append('</div>');
        });
    };
    // var status = document.getElementById("my-form-status");
}
form.addEventListener("submit", handleSubmit)
