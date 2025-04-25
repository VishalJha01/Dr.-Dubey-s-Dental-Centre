// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize navbar scroll effect
    initNavbarScroll()
  
    // Form validation for all forms with the 'needs-validation' class
    initFormValidation()
  
    // Initialize animations for elements with animation classes
    initAnimations()
  
    // Set active navbar link based on current page
    setActiveNavLink()
  
    // Initialize X-ray upload preview if on appointment page
    if (document.getElementById("xrayUpload")) {
      initXrayUpload()
    }
  
    // Initialize print receipt functionality if on appointment page
    if (document.getElementById("printReceipt")) {
      initPrintReceipt()
    }
  })
  
  // Function to handle navbar scroll effect
  function initNavbarScroll() {
    const navbar = document.querySelector(".navbar, .dental-navbar")
    if (navbar) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled")
        } else {
          navbar.classList.remove("scrolled")
        }
      })
    }
  }
  
  // Function to set active navbar link
  function setActiveNavLink() {
    // Get current page URL
    const currentPage = window.location.pathname.split("/").pop()
  
    // Remove active class from all nav links
    document.querySelectorAll(".dental-navbar .nav-link").forEach((link) => {
      link.classList.remove("active")
    })
  
    // Set active class based on current page
    if (currentPage === "" || currentPage === "index.html") {
      const homeLink = document.getElementById("nav-home")
      if (homeLink) homeLink.classList.add("active")
    } else if (currentPage === "appointment.html") {
      const appointmentLink = document.getElementById("nav-appointment")
      if (appointmentLink) appointmentLink.classList.add("active")
    } else if (currentPage === "login.html") {
      const loginLink = document.getElementById("nav-login")
      if (loginLink) loginLink.classList.add("active")
    }
  
    // Handle hash links for sections on the home page
    if (window.location.hash) {
      const hash = window.location.hash.substring(1)
      const homeLink = document.getElementById("nav-home")
  
      if (hash === "about") {
        const aboutLink = document.getElementById("nav-about")
        if (aboutLink) {
          aboutLink.classList.add("active")
          if (homeLink) homeLink.classList.remove("active")
        }
      } else if (hash === "services") {
        const servicesLink = document.getElementById("nav-services")
        if (servicesLink) {
          servicesLink.classList.add("active")
          if (homeLink) homeLink.classList.remove("active")
        }
      } else if (hash === "contact") {
        const contactLink = document.getElementById("nav-contact")
        if (contactLink) {
          contactLink.classList.add("active")
          if (homeLink) homeLink.classList.remove("active")
        }
      }
    }
  }
  
  // Function to initialize form validation
  function initFormValidation() {
    const forms = document.querySelectorAll(".needs-validation")
  
    // Loop over each form and prevent submission if validation fails
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
  
            // Show error alert
            if (document.getElementById("errorAlert")) {
              document.getElementById("errorAlert").classList.remove("d-none")
            }
          } else {
            event.preventDefault() // Prevent actual form submission for demo
  
            // Handle different form submissions
            if (form.id === "appointmentForm") {
              handleAppointmentSubmission()
            } else if (form.id === "loginForm") {
              handleLoginSubmission()
            }
          }
  
          form.classList.add("was-validated")
        },
        false,
      )
    })
  }
  
  // Function to initialize animations
  function initAnimations() {
    // Initialize AOS animations
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
      })
    }
  
    // Add animation classes to elements as they scroll into view
    const animatedElements = document.querySelectorAll(".animate-on-scroll")
  
    if (animatedElements.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animated")
            }
          })
        },
        { threshold: 0.1 },
      )
  
      animatedElements.forEach((element) => {
        observer.observe(element)
      })
    }
  }
  
  // Initialize X-ray upload preview
  function initXrayUpload() {
    // X-ray upload preview
    document.getElementById("xrayUpload").addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const previewDiv = document.getElementById("xrayPreview")
          previewDiv.classList.remove("d-none")
          previewDiv.querySelector("img").src = event.target.result
        }
        reader.readAsDataURL(file)
      }
    })
  
    // Remove X-ray preview\
    document.getElementById('removeXray\').addEventListener(\'click, function() {
          document.getElementById('xrayUpload').value = ''
    document.getElementById("xrayPreview").classList.add("d-none")
  }
  )
  }
  
  // Initialize print receipt functionality
  function initPrintReceipt() {
    document.getElementById("printReceipt").addEventListener("click", () => {
      const receiptContent = document.getElementById("receiptContent").innerHTML
      const printWindow = window.open("", "_blank")
  
      printWindow.document.write(`
              <!DOCTYPE html>
              <html>
              <head>
                  <title>Appointment Receipt - Dr. Dubey's Dental Centre</title>
                  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                  <style>
                      body { font-family: 'Arial', sans-serif; padding: 20px; }
                      .receipt-header { text-align: center; margin-bottom: 20px; }
                      .receipt-footer { text-align: center; margin-top: 30px; font-size: 12px; color: #6c757d; }
                      @media print {
                          .no-print { display: none; }
                          body { padding: 0; }
                      }
                  </style>
              </head>
              <body>
                  <div class="receipt-header">
                      <h3>Dr. Dubey's Dental Centre</h3>
                      <p>123 Dental Avenue, Medical District, New Delhi, 110001</p>
                  </div>
                  <h4 class="text-center mb-4">Appointment Receipt</h4>
                  <div class="container">
                      ${receiptContent}
                  </div>
                  <div class="receipt-footer">
                      <p>Thank you for choosing Dr. Dubey's Dental Centre</p>
                  </div>
                  <div class="text-center mt-4 no-print">
                      <button class="btn btn-primary" onclick="window.print()">Print Receipt</button>
                  </div>
              </body>
              </html>
          `)
  
      printWindow.document.close()
      setTimeout(() => {
        printWindow.focus()
      }, 500)
    })
  }
  
  // Handle appointment form submission with enhanced priority logic
  function handleAppointmentSubmission() {
    // Show loading spinner
    document.getElementById("submitText").classList.add("d-none")
    document.getElementById("loadingSpinner").classList.remove("d-none")
  
    // Simulate form submission delay
    setTimeout(() => {
      // Hide loading spinner
      document.getElementById("submitText").classList.remove("d-none")
      document.getElementById("loadingSpinner").classList.add("d-none")
  
      // Generate a random token number between 1000 and 9999
      const tokenNumber = Math.floor(Math.random() * 9000) + 1000
  
      // Get symptoms text
      const symptoms = document.getElementById("symptoms").value.toLowerCase()
  
      // Determine priority based on symptoms with more sophisticated logic
      let priority = "Low"
      let priorityClass = "text-success"
  
      // Keywords that might indicate higher priority
      const emergencyKeywords = [
        "severe pain",
        "extreme",
        "unbearable",
        "bleeding",
        "accident",
        "broken tooth",
        "knocked out",
        "facial swelling",
        "abscess",
      ]
      const urgentKeywords = [
        "pain",
        "swelling",
        "sensitive",
        "discomfort",
        "loose",
        "filling fell out",
        "crown came off",
      ]
      const routineKeywords = ["check up", "cleaning", "whitening", "cosmetic", "routine"]
  
      // Check for emergency keywords
      if (emergencyKeywords.some((keyword) => symptoms.includes(keyword))) {
        priority = "High"
        priorityClass = "text-danger"
      }
      // Check for urgent keywords if not already high
      else if (urgentKeywords.some((keyword) => symptoms.includes(keyword))) {
        priority = "Medium"
        priorityClass = "text-warning"
      }
      // Check for routine keywords
      else if (routineKeywords.some((keyword) => symptoms.includes(keyword))) {
        priority = "Low"
      }
      // If symptoms text is long but no keywords matched, default to medium
      else if (symptoms.length > 100) {
        priority = "Medium"
        priorityClass = "text-warning"
      }
  
      // Format date for receipt
      const appointmentDate = new Date(document.getElementById("appointmentDate").value)
      const formattedDate = appointmentDate.toDateString()
  
      // Format time for receipt
      const timeString = document.getElementById("appointmentTime").value
      let formattedTime = timeString
      if (timeString) {
        const [hours, minutes] = timeString.split(":")
        const hour = Number.parseInt(hours)
        const ampm = hour >= 12 ? "PM" : "AM"
        const hour12 = hour % 12 || 12
        formattedTime = `${hour12}:${minutes} ${ampm}`
      }
  
      // Populate receipt with form data
      document.getElementById("receiptName").textContent = document.getElementById("fullName").value
      document.getElementById("receiptAge").textContent = document.getElementById("age").value
      document.getElementById("receiptGender").textContent =
        document.getElementById("gender").options[document.getElementById("gender").selectedIndex].text
      document.getElementById("receiptPhone").textContent = document.getElementById("phone").value
      document.getElementById("receiptEmail").textContent = document.getElementById("email").value
      document.getElementById("receiptDate").textContent = formattedDate
      document.getElementById("receiptTime").textContent = formattedTime
      document.getElementById("receiptSymptoms").textContent = document.getElementById("symptoms").value
      document.getElementById("tokenNumber").textContent = tokenNumber
      document.getElementById("priorityLevel").textContent = priority
  
      // Set priority level color
      const priorityElement = document.getElementById("priorityLevel")
      priorityElement.className = `fw-bold ${priorityClass}`
  
      // Save appointment data to localStorage (simulating database storage)
      try {
        const appointmentData = {
          id: tokenNumber,
          name: document.getElementById("fullName").value,
          age: document.getElementById("age").value,
          gender: document.getElementById("gender").options[document.getElementById("gender").selectedIndex].text,
          phone: document.getElementById("phone").value,
          email: document.getElementById("email").value,
          symptoms: document.getElementById("symptoms").value,
          date: document.getElementById("appointmentDate").value,
          time: document.getElementById("appointmentTime").value,
          formattedDate: formattedDate,
          formattedTime: formattedTime,
          priority: priority,
          timestamp: new Date().toISOString(),
          status: "Pending",
          doctorName: "Dr. Rajesh Dubey",
          doctorPhone: "+91 98765 43210",
          doctorSpecialty: "Dental Surgeon & Implantologist",
        }
  
        // Get existing appointments or initialize empty array
        let appointments = []
        try {
          const existingData = localStorage.getItem("dentalAppointments")
          if (existingData) {
            appointments = JSON.parse(existingData)
          }
        } catch (e) {
          console.error("Error reading from localStorage:", e)
          appointments = []
        }
  
        // Add new appointment
        appointments.push(appointmentData)
  
        // Save back to localStorage
        localStorage.setItem("dentalAppointments", JSON.stringify(appointments))
  
        console.log("Appointment saved:", appointmentData)
      } catch (e) {
        console.error("Error saving appointment data:", e)
      }
  
      // Show confirmation modal
      const confirmationModal = new bootstrap.Modal(document.getElementById("confirmationModal"))
      confirmationModal.show()
  
      // Reset form
      document.getElementById("appointmentForm").reset()
      document.getElementById("appointmentForm").classList.remove("was-validated")
      document.getElementById("errorAlert").classList.add("d-none")
      document.getElementById("xrayPreview").classList.add("d-none")
    }, 1500) // Simulate 1.5 second delay for form processing
  }
  
  // Handle login form submission
  function handleLoginSubmission() {
    // Get form values
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
  
    // Check credentials (for demo purposes)
    if (email === "admin@clinic.com" && password === "123456") {
      // Show loading state
      document.getElementById("loginText").classList.add("d-none")
      document.getElementById("loginSpinner").classList.remove("d-none")
  
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = "dashboard.html"
      }, 1500)
    } else {
      // Show error message
      document.getElementById("loginAlert").classList.remove("d-none")
      document.getElementById("loginMessage").textContent = "Invalid email or password. Please try again."
    }
  }
  
  // Initialize DataTables if we're on the dashboard page
  if (document.getElementById("appointmentsTable")) {
    // Ensure jQuery is loaded
    if (typeof $ === "undefined") {
      console.error("jQuery is required for DataTables but is not loaded.")
      return;
    }
  
    const table = $("#appointmentsTable").DataTable({
      responsive: true,
      order: [[4, "asc"]], // Sort by priority column by default
      language: {
        search: "Search appointments:",
        lengthMenu: "Show _MENU_ appointments per page",
        info: "Showing _START_ to _END_ of _TOTAL_ appointments",
        paginate: {
          first: "First",
          last: "Last",
          next: "Next",
          previous: "Previous",
        },
      },
    })
  
    // Filter appointments by priority
    document.querySelectorAll("[data-filter]").forEach((button) => {
      button.addEventListener("click", function () {
        const filterValue = this.getAttribute("data-filter")
  
        if (filterValue === "all") {
          table.column(4).search("").draw()
        } else {
          table.column(4).search(filterValue).draw()
        }
  
        // Show toast notification
        showToast(`Filtered by ${filterValue} priority`)
      })
    })
  
    // Refresh button functionality
    document.getElementById("refreshBtn").addEventListener("click", () => {
      // In a real application, this would fetch fresh data from the server
      // For demo, we'll just redraw the table
      table.ajax.reload()
  
      // Show a toast notification
      showToast("Appointments refreshed successfully!")
    })
  }
  
  // Function to show toast notification
  function showToast(message) {
    if (document.getElementById("toastMessage")) {
      document.getElementById("toastMessage").textContent = message
      // Check if bootstrap is defined
      if (typeof bootstrap === "undefined") {
        console.error("Bootstrap is required for Toast but is not loaded.")
        alert(message)
      } else {
        const toast = new bootstrap.Toast(document.getElementById("liveToast"))
        toast.show()
      }
    } else {
      alert(message)
    }
  }
  