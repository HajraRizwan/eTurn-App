import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { markBillPaid } from '../services/payments';

const METHODS = [
	{ key: 'card', label: 'Card' },
	{ key: 'bank', label: 'Bank Transfer' },
	{ key: 'wallet', label: 'Wallet' },
];

export default function PayBillScreen({ navigation, route }) {
	const { bill, userId } = route.params || {};
	const [method, setMethod] = useState(METHODS[0].key);
	const [submitting, setSubmitting] = useState(false);

	if (!bill) {
		return (
			<View style={styles.center}> 
				<Text>Bill not found.</Text>
			</View>
		);
	}

	const onPayPress = async () => {
		if (submitting) return;
		setSubmitting(true);
		try {
			await markBillPaid(userId, bill.id, {
				method,
				amount: bill.amount,
				status: 'success',
				provider: 'DemoGateway',
				referenceId: `REF-${Math.floor(Math.random() * 1e9)}`,
			});
			Alert.alert('Payment Successful', 'Your bill has been paid.', [
				{ text: 'OK', onPress: () => navigation.replace('Bills', { userId }) },
			]);
		} catch (e) {
			Alert.alert('Payment Failed', 'Please try again later.');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Pay Bill</Text>
			<View style={styles.card}>
				<Text style={styles.billTitle}>{bill.title}</Text>
				<Text style={styles.sub}>Amount: ₹{bill.amount}</Text>
				<Text style={styles.sub}>Due: {new Date(bill.dueDate).toDateString()}</Text>
			</View>

			<Text style={styles.section}>Select Payment Method</Text>
			<View style={styles.methods}>
				{METHODS.map((m) => (
					<TouchableOpacity key={m.key} style={[styles.methodBtn, method === m.key && styles.methodSelected]} onPress={() => setMethod(m.key)}>
						<Text style={[styles.methodText, method === m.key && styles.methodTextSelected]}>{m.label}</Text>
					</TouchableOpacity>
				))}
			</View>

			<TouchableOpacity disabled={submitting} style={[styles.payBtn, submitting && { opacity: 0.7 }]} onPress={onPayPress}>
				<Text style={styles.payText}>{submitting ? 'Processing...' : 'Pay Now'}</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff', padding: 16 },
	title: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
	card: { backgroundColor: '#f7f7f7', borderRadius: 12, padding: 16, marginBottom: 16 },
	billTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
	sub: { color: '#555', marginBottom: 4 },
	section: { marginTop: 8, marginBottom: 8, fontSize: 16, fontWeight: '700' },
	methods: { flexDirection: 'row', gap: 8 },
	methodBtn: { paddingVertical: 10, paddingHorizontal: 14, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
	methodSelected: { backgroundColor: '#1e90ff', borderColor: '#1e90ff' },
	methodText: { fontWeight: '700' },
	methodTextSelected: { color: '#fff' },
	payBtn: { marginTop: 24, backgroundColor: '#1e90ff', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
	payText: { color: '#fff', fontSize: 16, fontWeight: '800' },
	center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});