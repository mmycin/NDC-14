// @ts-ignore
import Toastify from "toastify-js/";
import "toastify-js/src/toastify.css";

// Define a function that shows a notification
export default function Notification(
    message: string,
    type: "success" | "error" = "success"
): void {
    // Set background color based on the notification type
    const backgroundColor = type === "success" ? "#28a745" : "#dc3545";

    // Define the toast options with type safety
    const options: any = {
        text: message,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        backgroundColor,
        stopOnFocus: true,
        onClick: function () {
            // You can handle click events here if needed
        },
        style: {
            borderRadius: "8px",
            padding: "12px 24px",
        },
    };

    // Show the toast with the defined options
    Toastify(options).showToast();
}
