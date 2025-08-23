import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchUserPayments } from '../services/payments';

export default function PaymentHistoryScreen({ route }) {
	const userId = route?.params?.userId || 'demoUser';
	const [loading, setLoading] = useState(true);
	const [payments, setPayments] = useState([]);

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const payObj = await fetchUserPayments(userId);
				const list = Object.values(payObj || {}).sort((a, b) => b.createdAt - a.createdAt);
				setPayments(list);
			} catch (e) {
				console.warn('Failed to load payments', e);
			} finally {
				setLoading(false);
			}
		})();
	}, [userId]);

	if (loading) {
		return (
			<View style={styles.center}> 
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.headerTitle}>Payment History</Text>
			<FlatList
				data={payments}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.card}>
						<Text style={styles.title}>₹{item.amount} - {item.method.toUpperCase()}</Text>
						<Text style={styles.sub}>Payment ID: {item.id}</Text>
						<Text style={styles.sub}>Bill ID: {item.billId}</Text>
						<Text style={[styles.status, item.status === 'success' ? styles.success : styles.failed]}>{item.status.toUpperCase()}</Text>
						<Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
					</View>
				)}
				ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
				contentContainerStyle={{ padding: 16 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	headerTitle: { fontSize: 20, fontWeight: '800', padding: 16 },
	card: { backgroundColor: '#f7f7f7', borderRadius: 12, padding: 16 },
	title: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
	sub: { color: '#555' },
	status: { marginTop: 6, fontWeight: '700' },
	success: { color: 'green' },
	failed: { color: 'red' },
	date: { marginTop: 4, color: '#333' },
	center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});