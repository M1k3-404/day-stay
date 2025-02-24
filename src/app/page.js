"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase";
import axios from "axios";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await addDoc(collection(db, "waitlist"), { name, email, timestamp: Timestamp.now() });

      await axios.post('/api/waitlist', { name, email });

      setMessage('✅ Successfully registered! Check your email.');
      setName('');
      setEmail('');
    } catch (error) {
      console.error(error);
      setMessage('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-full bg-[#f8f8ff] flex justify-content items-center">
      <div className="text-center w-full">
        <p className="text-3xl font-semibold">Welcome, Are You Ready To Spice Things Up?</p>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-4">Pre-Register</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pre-Register</DialogTitle>
              <DialogDescription>We will let you know once we're online.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" required />
              </div>
              {message && <p className="text-center text-sm">{message}</p>}
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
