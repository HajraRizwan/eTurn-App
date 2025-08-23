import { ref, child, get, set, push, update } from 'firebase/database';
import { firebaseDatabase } from '../firebase';

// Paths
const USERS_PATH = 'users';
const BILLS_PATH = 'bills';
const PAYMENTS_PATH = 'payments';

export async function fetchUserBills(userId) {
	const billsRef = ref(firebaseDatabase, `${USERS_PATH}/${userId}/${BILLS_PATH}`);
	const snapshot = await get(billsRef);
	return snapshot.exists() ? snapshot.val() : {};
}

export async function fetchUserPayments(userId) {
	const paymentsRef = ref(firebaseDatabase, `${USERS_PATH}/${userId}/${PAYMENTS_PATH}`);
	const snapshot = await get(paymentsRef);
	return snapshot.exists() ? snapshot.val() : {};
}

export async function createBill(userId, bill) {
	// bill: { id?, title, amount, dueDate, status: 'pending'|'paid'|'overdue', description? }
	const billsRef = ref(firebaseDatabase, `${USERS_PATH}/${userId}/${BILLS_PATH}`);
	const newBillRef = push(billsRef);
	const billId = newBillRef.key;
	const payload = { id: billId, createdAt: Date.now(), ...bill };
	await set(newBillRef, payload);
	return payload;
}

export async function markBillPaid(userId, billId, payment) {
	// payment: { method, amount, referenceId?, provider?, status: 'success'|'failed'|'pending' }
	const billRef = ref(firebaseDatabase, `${USERS_PATH}/${userId}/${BILLS_PATH}/${billId}`);
	await update(billRef, { status: 'paid', paidAt: Date.now() });

	const paymentsRef = ref(firebaseDatabase, `${USERS_PATH}/${userId}/${PAYMENTS_PATH}`);
	const newPaymentRef = push(paymentsRef);
	const paymentId = newPaymentRef.key;
	const payload = {
		id: paymentId,
		billId,
		createdAt: Date.now(),
		...payment,
	};
	await set(newPaymentRef, payload);
	return payload;
}

export async function seedSampleBills(userId) {
	const existing = await fetchUserBills(userId);
	if (existing && Object.keys(existing).length > 0) {
		return existing;
	}
	const samples = [
		{ title: 'Monthly Maintenance - Sep', amount: 1500, dueDate: Date.now() + 7*24*3600*1000, status: 'pending', description: 'Maintenance charges for September' },
		{ title: 'Water Bill - Aug', amount: 420, dueDate: Date.now() - 3*24*3600*1000, status: 'overdue', description: 'Water usage charges for August' },
		{ title: 'Electricity - Aug', amount: 980, dueDate: Date.now() + 2*24*3600*1000, status: 'pending', description: 'Electricity usage for August' },
	];
	const results = {};
	for (const bill of samples) {
		const created = await createBill(userId, bill);
		results[created.id] = created;
	}
	return results;
}