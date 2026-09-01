import { Injectable, signal, computed } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    User
} from 'firebase/auth';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private app = initializeApp(environment.firebaseConfig);
    private auth = getAuth(this.app);

    currentUser = signal<User | null>(null);

    isAuthenticated = computed(() => !!this.currentUser());

    constructor() {
        onAuthStateChanged(this.auth, (user) => {
            this.currentUser.set(user);
        });
    }

    async registerWithEmail(email: string, pass: string): Promise<User | null> {
        try {
            const result = await createUserWithEmailAndPassword(this.auth, email, pass);
            return result.user;
        } catch (error) {
            console.error('Помилка реєстрації:', error);
            throw error;
        }
    }

    async loginWithEmail(email: string, pass: string): Promise<User | null> {
        try {
            const result = await signInWithEmailAndPassword(this.auth, email, pass);
            return result.user;
        } catch (error) {
            console.error('Помилка входу:', error);
            throw error;
        }
    }

    async loginWithGoogle(): Promise<User | null> {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(this.auth, provider);
            return result.user;
        } catch (error) {
            console.error('Помилка Google auth:', error);
            throw error;
        }
    }

    async updateUserProfile(data: { displayName?: string; photoURL?: string }): Promise<void> {
        const user = this.auth.currentUser;
        if (!user) throw new Error('Користувач не авторизований');

        try {
            await updateProfile(user, data);
            this.currentUser.set({ ...user });
        } catch (error) {
            console.error('Помилка оновлення профілю:', error);
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            await signOut(this.auth);
        } catch (error) {
            console.error('Помилка виходу:', error);
            throw error;
        }
    }
}
