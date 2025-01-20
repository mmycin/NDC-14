import axios from "axios";
import Notification from "$lib/Utils/Notify";
import { goto } from "$app/navigation";

export async function DeleteItem(url: string, gotoUrl: string | null) {
    // Create the confirmation dialog
    const dialog = document.createElement("div");
    dialog.style.position = "fixed";
    dialog.style.top = "0";
    dialog.style.left = "0";
    dialog.style.width = "100%";
    dialog.style.height = "100%";
    dialog.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    dialog.style.display = "flex";
    dialog.style.justifyContent = "center";
    dialog.style.alignItems = "center";
    dialog.style.zIndex = "1000";
    dialog.style.padding = "16px"; // Add padding for mobile responsiveness

    const dialogBox = document.createElement("div");
    dialogBox.style.backgroundColor = "#1f2937"; // Dark gray
    dialogBox.style.padding = "20px";
    dialogBox.style.borderRadius = "8px";
    dialogBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    dialogBox.style.textAlign = "center";
    dialogBox.style.width = "100%"; // Full width for mobile
    dialogBox.style.maxWidth = "400px"; // Limit width for larger screens

    const message = document.createElement("p");
    message.textContent = "Are you sure you want to delete this?";
    message.style.marginBottom = "20px";
    message.style.color = "#f3f4f6"; // Light gray text

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "space-between";
    buttonContainer.style.gap = "10px";

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm";
    confirmButton.style.backgroundColor = "#ef4444"; // Red
    confirmButton.style.color = "white";
    confirmButton.style.border = "none";
    confirmButton.style.padding = "10px 20px";
    confirmButton.style.borderRadius = "5px";
    confirmButton.style.cursor = "pointer";
    confirmButton.style.flex = "1"; // Make buttons equal width on mobile

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.style.backgroundColor = "#4b5563"; // Dark gray
    cancelButton.style.color = "white";
    cancelButton.style.border = "none";
    cancelButton.style.padding = "10px 20px";
    cancelButton.style.borderRadius = "5px";
    cancelButton.style.cursor = "pointer";
    cancelButton.style.flex = "1"; // Make buttons equal width on mobile

    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(cancelButton);
    dialogBox.appendChild(message);
    dialogBox.appendChild(buttonContainer);
    dialog.appendChild(dialogBox);
    document.body.appendChild(dialog);

    return new Promise((resolve) => {
        // Confirm Button Action
        confirmButton.addEventListener("click", async () => {
            document.body.removeChild(dialog);
            try {
                const response = await axios.delete(url);
                Notification("Deleted Successfully", "success");
                gotoUrl ? goto(gotoUrl) : goto(window.location.pathname);
                resolve(true);
            } catch (error) {
                console.error("Error deleting item:", error);
                Notification("Error deleting item", "error");
                resolve(false);
            }
        });

        // Cancel Button Action
        cancelButton.addEventListener("click", () => {
            document.body.removeChild(dialog);
            resolve(false);
        });
    });
}
