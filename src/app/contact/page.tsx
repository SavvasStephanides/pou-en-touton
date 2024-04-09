import Link from "next/link"
import "./contact-form.css"

export default function ContactPage() {
    return(<div className="contact-form">
        <div>
            <Link href={"/game"}>Επιστροφή στο παιχνίδι</Link>
        </div>
        <h1>Επικοινωνία με τον δημιουργό</h1>
    <form action="https://formsubmit.co/savvascyp@hotmail.com" method="POST">
        <div className="input-field">
            <label htmlFor="name-input">Όνομα (προαιρετικό)</label>
            <input id="name-input" type="text" name="name" />
        </div>
        
        <div className="input-field">
            <label htmlFor="email-input">E-mail (προαιρετικό)</label>
            <input id="email-input" type="email" name="email" />
        </div>

        <div className="input-field">
            <label htmlFor="message-input">Το μήνυμα σας</label>
            <textarea id="message-input" name="message" cols={30} rows={10} required></textarea>
        </div>

        <button type="submit">Αποστολή</button>
    </form>
    </div>)
}