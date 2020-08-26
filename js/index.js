let data;
    let count = 0;
    document.getElementById("btn").addEventListener("click", (e) => {
        e.preventDefault();
      if (count != 1) {
        let text = document.getElementById("json").value;
        data = JSON.parse(text);
        console.log(data);
        let htmlform = document.getElementById("htmlform");
        let mainform = document.getElementById("heading");
        Object.keys(data).forEach((key) => {
          if (key == "Title") {
            let heading = document.createElement("h1");
            heading.innerHTML = key;
            mainform.appendChild(heading);
          } else if (key == "Sub Title") {
            let heading = document.createElement("h4");
            heading.innerHTML = key;
            mainform.appendChild(heading);
          } else if (
            /^(?:m|M|male|Male)\/(?:f|F|female|Female)$/.test(data[key])
          ) {
            let form = document.createElement("form");
            form.className = "input"
            let label = document.createElement("label");
            label.innerHTML = "Gender :  ";
            form.appendChild(label);
            let options = data[key].split("/");
            createRadio(options[0], form);
            createRadio(options[1], form);
            htmlform.appendChild(form);
          } else {
            let label = document.createElement("label");
            label.innerHTML = key;
            htmlform.appendChild(label);
            if (/(^[#][a-zA-Z0-9]{1,6})/.test(data[key])) {
              createInput("color", data[key]);
            } else if (key.includes("DOB")) {
              createInput("date", data[key]);
            } else if (key.includes("Language")) {
              let values = data[key].replace("and", ",").split(",");
              createSelect(values);
            } else if (key.includes("Upload")) {
              createInput("file", "Choose file");
            } else if (/([1][-][0-9]{1,2})\w+/.test(data[key])) {
              createInput("range", data[key]);
            } else if (
              /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
                data[key]
              )
            ) {
              createInput("email", data[key]);
            } else if (
              /(([01]?[0-9]):([0-5][0-9]) ([AaPp][Mm]))/.test(data[key])
            ) {
              createInput("time", data[key]);
            } else if (typeof data[key] == "string") {
              createInput("text", data[key]);
            } else if (typeof data[key] == "number") {
              createInput("number", data[key]);
            } else if (Array.isArray(data[key])) {
              createSelect(data[key]);
            }
          }
        });
        let button = document.createElement("button");
        button.innerHTML = "Submit";
        button.className = "btn btn-danger mt-3 formButton";
        htmlform.appendChild(button);
        document.querySelector(".formButton").addEventListener("click", (e) => {
          e.preventDefault();
          let inputs = document.querySelectorAll(".input")
          console.log(inputs)
          inputs.forEach((input,index) => {
            localStorage.setItem(index, input.value)
          })
        });
      }
        count = 1;
    });
    let createInput = (type, value) => {
      let input = document.createElement("input");
      input.className = "input"
      input.setAttribute("type", type);
      input.setAttribute("value", value);
      input.setAttribute("id", value);
      htmlform.appendChild(input);
    };
    let createRadio = (value, form) => {
      let input = document.createElement("input");
      let label = document.createElement("label");
      label.innerHTML = value;
      input.setAttribute("type", "radio");
      input.setAttribute("value", value);
      input.setAttribute("id", value);
      input.setAttribute("name", "gender");
      form.appendChild(input);
      form.appendChild(label);
    };
    let createSelect = (values) => {
      let select = document.createElement("select");
      select.className = "input"
      values.forEach((value) => {
        let option = document.createElement("option");
        option.text = value;
        select.add(option);
      });
      htmlform.appendChild(select);
    };